const router = require("express").Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const csrf = require("csurf");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { SendEmail } = require("../utils/sendEmail/sendEmail");
const logger = require("../logging/logging");

const csrfProtection = csrf({ cookie: true });

router.post("/", csrfProtection, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(200).json({
            success: false,
            message: "Please provide all necessary fields.",
            data: {}
        });
    }
    if (password.length < 8) {
        return res.status(200).json({
            success: false,
            message: "Password length has to be atleast of 8 characters",
            data: {}
        });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        logger.error(err);
    }

    if (existingUser) {
        return res.json({
            success: false,
            message: "User with this email id already exists",
            data: {}
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        passwordHash
    });
    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (err) {
        logger.error(err);
    }

    const token = jwt.sign(
        {
            user: savedUser._id
        },
        process.env.JWT_SECRET
    );

    return res.cookie("token", token, { secure: true, sameSite: "none" }).json({
        success: true,
        message: "Successfully Registered",
        data: { firstName, lastName, email },
        token
    });
});

router.post("/login", csrfProtection, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(200).json({
            success: false,
            message: "Email or Password is missing",
            data: {}
        });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        logger.error(err);
    }

    if (!existingUser) {
        return res.json({
            success: false,
            message: "Wrong Email Id or Password",
            data: {}
        });
    }

    const matchPassword = await bcrypt.compare(
        password,
        existingUser.passwordHash
    );
    if (!matchPassword) {
        return res.json({
            success: false,
            message: "Wrong Email Id or Password",
            data: {}
        });
    }

    const token = jwt.sign(
        {
            user: existingUser._id
        },
        process.env.JWT_SECRET
    );
    return res.cookie("token", token, { secure: true, sameSite: "none" }).json({
        success: true,
        message: "Successfully Logged In",
        data: {
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email
        },
        token
    });
});

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        secure: true,
        expires: new Date(0),
        sameSite: "none"
    }).send();
});

router.get("/loggedin", csrfProtection, (req, res) => {
    const { cookies } = req;
    const { token, csrfToken } = cookies;
    const toSend = {};

    if (!csrfToken) {
        toSend.csrfToken = req.csrfToken();
    }

    if (!token) {
        toSend.status = false;
        return res.json(toSend);
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            toSend.status = false;
            return res.json(toSend);
        }
        toSend.status = true;
        return res.json(toSend);
    } catch (err) {
        logger.error(err);
        toSend.status = false;
        return res.json(toSend);
    }
});

router.post("/forgot", csrfProtection, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Please provide all fields"
        });
    }

    let user;
    try {
        user = await User.findOne({ email });
    } catch (err) {
        logger.error(err);
    }

    if (!user) {
        return res.json({
            success: false,
            message: "User with this email address doesn't exist"
        });
    }
    const randomBytes = crypto.randomBytes(20);
    const token = randomBytes.toString("hex");
    const expiry = Date.now() + 3600000;

    try {
        await User.updateOne(
            { email },
            { resetToken: token, resetExpire: expiry }
        );
    } catch (err) {
        logger.error(err);
    }

    try {
        await SendEmail({ email, token, expiry });
        return res.json({
            success: true,
            message: "Password Reset Email has been sent"
        });
    } catch (err) {
        logger.error(err);
        return res.json({
            success: false,
            message: err.message
        });
    }
});

router.post("/reset/:token", csrfProtection, async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.json({
            success: false,
            message: "Please provide all fields"
        });
    }

    let user;
    try {
        user = await User.findOne({
            resetToken: req.params.token,
            resetExpire: { $gt: Date.now() }
        });
    } catch (err) {
        logger.error(err);
    }

    if (!user) {
        return res.json({
            success: false,
            message: "Reset link is invalid or expired. Generate a new one."
        });
    }

    if (password.length < 8) {
        return res.status(200).json({
            success: false,
            message: "Password length has to be atleast of 8 characters"
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.passwordHash = passwordHash;
    user.resetToken = undefined;
    user.resetExpire = undefined;

    try {
        await user.save();
        return res.json({
            success: true,
            message:
                "Password has been successfully reset. Please log in to continue."
        });
    } catch (err) {
        logger.error(err);
        return res.json({
            success: false,
            message: "Couldn't reset password. Please try again."
        });
    }
});

exports.AuthRouter = router;
