const mongoose = require("mongoose");
//Model k uložení a prácí s přispěvky v databázi

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: false,
    },
    name: {
        type: String
    },
    picture: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    dislikes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        upvotes: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        }],
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }

    }],
    date: {
        type: Date,
        default: Date.now
    }


});


module.exports = Post = mongoose.model("post", PostSchema)