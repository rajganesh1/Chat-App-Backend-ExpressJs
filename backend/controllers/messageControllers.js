const asyncHandler = require('express-async-handler');
const  Message  = require('../models/messageModel');
const User = require('../models/userModel');
const uuid = require('uuid');

const sendMessage = asyncHandler(async (req, res) => {
const { text, rec_id } = req.body;
    if (!text || !rec_id) {
        console.log('Could not send message');
        return res.sendStatus(400);
    }
  const user = await User.findOne({ id: rec_id });
    if (!user) {
      return res.status(404).send('User not Found..!!');
    }

  try {
    const uuidv4=uuid.v4();
    req.body.id=uuidv4;
    var newMessage = {
        id: req.body.id,
        sender: req.user.id,
        receiver: req.body.rec_id,
        content: req.body.text,
    };
    await Message.create(newMessage);
    //console.log(req.user.id, req.body.rec_id);
    
    const Pusher = require("pusher");

    const pusher = new Pusher({
    appId: process.env.pusher_app_id,
    key: process.env.pusher_key,
    secret: process.env.pusher_secret,
    cluster: process.env.pusher_cluster,
    useTLS: true
    });

    pusher.trigger("channel-"+req.body.rec_id, "event-"+req.body.rec_id, {
    message: req.body.text
    });
    res.json('Message sent Sucessfully');

  }catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
});

const getallMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({$or: [{ receiver: req.params.receiver_id, receiver: req.user.id }]});
    res.send(messages);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  try {
      Message.deleteOne({ id: req.body.message_id }, (err, result) => {
      if (err) {
        res.send(`err:${err}`);
      }
      else {
        res.send('Message deleted Successfully');
      }
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
  
});

module.exports = { sendMessage , getallMessages , deleteMessage };