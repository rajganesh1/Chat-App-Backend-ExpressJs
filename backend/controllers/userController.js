const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuid = require('uuid');

const registerUser = asyncHandler(async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const uuidv4=uuid.v4();
    req.body.id=uuidv4;
    const today = new Date().toLocaleString('en-US', { timeZone: 'IST' });

    if (!name || !email || !req.body.password) {
        res.sendStatus(400);
        throw new Error("Please Enter all the Fields");
    }

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).send("User already Exists");
        throw new Error("User already Exists");
    }

    req.body.createdAt = today;
 
    const user = new User((req.body));
    await user.save();

    if (user) {
        res.status(201).json({
            id: user.id,
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
            id: user.id,
            name: user.name,
            email: user.email,
            time: today + '(IST)',
            token: generateToken(user.id),
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
    const users = await User.find(keyword).find({ id: { $ne: req.user.id } });
    res.send(users);
})

module.exports = { registerUser, authUser ,allUsers };

//$2b$10$LkHr/FXMLBhKcT7SF5RVz.tcJioNthWoPT7lYveU4vo2klGu9CwQq
//$2b$10$LkHr/FXMLBhKcT7SF5RVz.tcJioNthWoPT7lYveU4vo2klGu9CwQq
