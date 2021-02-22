const express = require("express");
let router = express.Router();
require("dotenv").config();

const { checkLogginIn } = require("../../middleware/auth");

const { User } = require("../../models/userModel");

router.route("/register").post(async (req, res) => {
    try {
        // 1 check email
        if (await User.emailTaken(req.body.email)) {
            return res.status(400).json({
                message: "Упс, похоже этот email уже используется...",
            });
        }

        // 2 create new User with hash
        const user = new User({
            email: req.body.email,
            password: req.body.password,
        });

        // 3 generate token
        // const token = user.generateToken();
        const doc = await user.save();

        // 4 save and send token with cookie
        // res.cookie("x-access-token", token).status(200).send(getProps(doc));
        res.status(200).send(getProps(doc));
    } catch (error) {
        res.status(400).json({ message: "Error register", error: error });
    }
});

router.route("/signin").post(async (req, res) => {
    try {
        // 1 find user
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(400)
                .json({ message: "User with this email not find" });

        // 2 compare password
        const compare = await user.comparePassword(req.body.password);
        if (!compare)
            return res.status(400).json({ message: "Wrong password" });

        // 3 generate token
        const token = user.generateToken();

        // 4 send res
        res.cookie("x-access-token", token).status(200).send(getProps(user));
    } catch (error) {
        res.status(400).json({ message: "Error auth", error: error });
    }
});

router.route("/profile").get(checkLogginIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).send(getProps(user));
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.route("/isauth").get(checkLogginIn, async (req, res) => {
    res.status(200).send(getProps(req.user));
});

router.route("/addreq").patch(checkLogginIn, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $push: {
                    requests: req.body.data,
                },
            },
            { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json(getProps(user));
    } catch (error) {
        res.status(400).json({ message: "Error send request", error: error });
    }
});

router.route("/editreq").patch(checkLogginIn, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id, "requests.id": req.body.id },
            {
                $set: {
                    "requests.$.title": req.body.data.title,
                    "requests.$.name": req.body.data.name,
                    "requests.$.sort": req.body.data.sort,
                    "requests.$.size": req.body.data.size,
                },
            },
            { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json(getProps(user));
    } catch (error) {
        res.status(400).json({ message: "Error send request", error: error });
    }
});

router.route("/removereq").patch(checkLogginIn, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.body._id },
            {
                $pull: {
                    requests: { id: req.body.id },
                },
            },
            { new: true }
        );

        if (!user) return res.status(400).json({ message: "User not found" });

        res.status(200).json(getProps(user));
    } catch (error) {
        res.status(400).json({ message: "Error send request", error: error });
    }
});

const getProps = (user) => {
    return {
        _id: user._id,
        email: user.email,
        requests: user.requests,
    };
};

module.exports = router;
