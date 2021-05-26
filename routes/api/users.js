const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User")

//@route    POST api/users
//@desc     Registrace
//@access   Public
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must contain the maximum of 10 characters").isLength({ max: 10 }),
    check("email", "Please include an valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        // uživatel existuje?
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] })
        }
        user = new User({
                name,
                email,
                password
            })
            // encrypt heslo
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // jwt

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get("jwtSecret"), { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({ token });

            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).send("server error")
    }
})

module.exports = router;