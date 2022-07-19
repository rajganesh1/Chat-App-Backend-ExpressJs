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
        return res.status(403).json({ errors: "Please Enter all the fields" });
    }

    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(403).json({ errors: "User already exists..!!" });
    }

    req.body.createdAt = today;
 
    const user = new User((req.body));
    await user.save();

    const token = generateToken({ email: user.email, id: user.id });
    res.cookie("access_token", token);

    if (user) {
        res.status(201).json({
            user: exposeUserDetails(user),
            time: today + ' (IST)',
            token: token
        });
    }
    else {
        return res.status(403).json({ errors: "Failed to create user" });
    }

});


const authUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const today = new Date().toLocaleString('en-US', { timeZone: 'IST' });
    const user = await User.findOne({ email: email });
    if (user.email == undefined || user.email == null) {
        return res.status(403).json({ errors: "Incorrect credentials" });
    }
    const isvalid = await bcrypt.compare(password, user.password);
    if (user && (isvalid)) {
        const token = generateToken({ id: user.id });
        res.cookie("access_token", token);
        res.json({
            user: exposeUserDetails(user),
            time: today + '(IST)',
            token: token
        });
    }
    else {
        return res.status(403).json({ errors: "Incorrect credentials" });
    }
});

function exposeUserDetails(user) {
  return {
    email: user.email,
    name: user.name,
    //contacts: user.contacts,
    id: user.id,
  };
}

const contacts = asyncHandler(async (req, res) => {
    try {
        console.log(req.user.id);
        const user = await User.findOne({ id: (req.params.id) });//error here
        console.log(user, req.user.id);
        
        if (!user) {
            return res.status(403).send("User does not exists");
        }
        const contacts = await User.find({ "id":{ "$in": user.contacts } });
        const contactDetail = contacts.map(contact => exposeUserDetails(contact));
        res.send(contactDetail);

    } catch (err) {
        console.log(err.message);
        return res.status(404).json({ errors: "An error occured"});
    }
})

function logout(req, res, next) {
  res.send({
    message: "User Logged out"
  })
}

module.exports = { registerUser, authUser ,contacts ,logout};

//$2b$10$LkHr/FXMLBhKcT7SF5RVz.tcJioNthWoPT7lYveU4vo2klGu9CwQq
//$2b$10$LkHr/FXMLBhKcT7SF5RVz.tcJioNthWoPT7lYveU4vo2klGu9CwQq
