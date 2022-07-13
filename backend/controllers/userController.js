const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = asyncHandler(async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const today = new Date().toLocaleString('en-US', { timeZone: 'IST' });

    if (req.body.password) {
        req.body.password= bcrypt.hashSync(req.body.password, saltRounds)
    }

    if (!name || !email || !req.body.password) {
        res.sendStatus(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.sendStatus(400);
        throw new Error("User already Exists");
    }
 
    const user = new User((req.body));
    await user.save();

    if (user) {
        //console.log(user.password);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            time: today+' (IST)',
            token: generateToken(user._id),
        });
    }
    else {
        res.sendStatus(400);
        throw new Error('Failed to create user');
    }

});

const authUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const today = new Date().toLocaleString('en-US', { timeZone: 'IST' });
    const user = await User.findOne({ email: email });
    const isvalid = await bcrypt.compare(password, user.password);
    if (user && (isvalid)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            time: today + '(IST)',
            token: generateToken(user._id),
        });
    }
    else {
        res.sendStatus(401);
        throw new Error('Invalid email or password');
    }
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ],
    } : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})

module.exports = { registerUser, authUser ,allUsers};

//$2b$10$LkHr/FXMLBhKcT7SF5RVz.tcJioNthWoPT7lYveU4vo2klGu9CwQq
//$2b$10$LkHr/FXMLBhKcT7SF5RVz.tcJioNthWoPT7lYveU4vo2klGu9CwQq
