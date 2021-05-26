const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const Profile = require("../../models/Profile")
const User = require("../../models/User")
const Post = require("../../models/Post")
const normalize = require('normalize-url');
const { check, validationResult } = require("express-validator");
const config = require("config");

//@route    GET api/profile/me
//@desc     najít uživatelův profil
//@access   Private
router.get("/me", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

//@route    POST api/profile
//@desc     vytvořit/updatovat profil
//@access   Private

router.post("/", auth, async(req, res) => {
    let {
        website,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        avatar,
        githubusername,
        ...rest
    } = req.body;


    if (avatar === "") {
        avatar = "https://avatars.githubusercontent.com/u/36159327?s=200&v=4"
    }


    const profileFields = {
        website: website && website !== '' ?
            normalize(website, { forceHttps: true }) : '',
        user: req.user.id,
        avatar: avatar,
        ...rest
    };

    const socialFields = { youtube, twitter, instagram, linkedin, facebook, githubusername };
    profileFields.social = socialFields;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            return res.json(profile);
        }
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
});

//@route    GET api/profile
//@desc     najít všechny profily
//@access   Public

router.get("/", async(req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.send(profiles)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
});

//@route    GET api/profile/user/:id
//@desc     najít profil podle id
//@access   Public
router.get("/user/:user_id", async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
        if (!profile) return res.status(400).json({ msg: "Profile not found" });
        res.send(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
        }
    }
});

//@route    DELETE api/profile 
//@desc     smazat profil
//@access   Private

router.delete("/", auth, async(req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id })
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
});

//@route    PUT api/profile/experience
//@desc     přidat zkušenost
//@access   Private

router.put("/experience", [auth, [
    check("title", "title is required").not().isEmpty(),
    check("company", "company is required").not().isEmpty(),
    check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(req.body);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route    DELETE api/profile/experience/:exp_id
//@desc     smazat zkušenost
//@access   Private

router.delete("/experience/:exp_id", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route    PUT api/profile/education
//@desc     přidat školu
//@access   Private

router.put("/education", [auth, [
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
    check('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(req.body);

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//@route    DELETE api/profile/education/:edu_id
//@desc     smazat školu
//@access   Private

router.delete("/education/:edu_id", auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;