const mongoose = require('mongoose');

const messageModel = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        sent_at: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timeStamp: true,
    }
)

const Message = mongoose.model('Message', messageModel);
module.exports = Message;