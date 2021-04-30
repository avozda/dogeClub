const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//@route    POST api/posts
//@desc     vytvořit příspěvek
//@access   Private
router.post("/", [auth, [
    check("text", "Text is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const newPost = new Post({
            text: req.body.text,
            picture: req.body.picture,
            name: profile.name,
            avatar: profile.avatar,
            user: req.user.id
        })

        const post = await newPost.save();
        res.json(post)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }


})


//@route    GET api/posts
//@desc     najít všechny příspěvky
//@access   Private

router.get("/", auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

//@route    GET api/posts/:id
//@desc     najít příspěvek podle id
//@access   Private
router.get("/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post nor found" });
        }
        res.json(post);
    } catch (error) {
        console.error(error);

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
        }
        res.status(500).send("Server error");
    }
})


//@route    delete api/posts/:id
//@desc     smazat příspěvek
//@access   Private

router.delete("/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post nor found" });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await post.remove();
        res.json({ msg: "Post removed" });
    } catch (error) {
        console.error(error);
        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "Post not found" });
        }
        res.status(500).send("Server error")
    }
});



//@route    put api/posts/like/:id
//@desc     like
//@access   Private

router.put("/like/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check jestli user dal like
        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post already liked" });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route    put api/posts/unlike/:id
//@desc     unlike
//@access   Private

router.put("/unlike/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check jestli user dal like
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post has not yet been liked" });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route    put api/posts/dislike/:id
//@desc     dislike
//@access   Private

router.put("/dislike/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check jestli user dal dislike
        if (post.dislikes.some((dislike) => dislike.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post already disliked" });
        }
        post.dislikes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.dislikes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route    put api/posts/undislike/:id
//@desc     undislike
//@access   Private

router.put("/undislike/:id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check jestli user dal dislike
        if (!post.dislikes.some((dislike) => dislike.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post has not yet been disliked" });
        }

        const removeIndex = post.dislikes.map(dislike => dislike.user.toString()).indexOf(req.user.id);
        post.dislikes.splice(removeIndex, 1);

        await post.save();
        res.json(post.dislikes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route    POST api/posts/comment/:id
//@desc     komentář na příspěvek
//@access   Private
router.post("/comment/:id", [auth, [
    check("text", "Text is required").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);
        const profile = await Profile.findOne({ user: req.user.id });

        const newComment = {
            text: req.body.text,
            name: profile.name,
            avatar: profile.avatar,
            user: req.user.id
        };

        post.comments.push(newComment);

        await post.save();
        res.json(post.comments)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
});
//@route    put api/posts/comment/upvote/:id/:comment_id
//@desc     upvote
//@access   Private

router.put("/comment/upvote/:id/:comment_id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        //Check jestli user dal upvote
        if (comment.upvotes.some((upvote) => upvote.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post already upvoted" });
        }
        comment.upvotes.unshift({ user: req.user.id });
        await post.save();
        res.json(comment.upvotes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route    put api/posts/comment/unupvote/:id/:comment_id
//@desc     unupvote
//@access   Private

router.put("/comment/unupvote/:id/:comment_id", auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        //Check jestli user dal upvote
        if (!comment.upvotes.some((upvote) => upvote.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: "Post already upvoted" });
        }

        const removeIndex = comment.upvotes.map(upvote => upvote.user.toString()).indexOf(req.user.id);
        comment.upvotes.splice(removeIndex, 1);

        await post.save();
        res.json(comment.upvotes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route    Delete api/posts/comment/:id/:comment_id
//@desc     smazat koment
//@access   Private
router.delete("/comment/:id/:comment_id", auth, async(req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: "Comment does not exist" });
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
});




module.exports = router;