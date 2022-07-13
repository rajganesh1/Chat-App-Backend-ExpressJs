const mongoose = require('mongoose');

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: new Date().toLocaleString('en-US', { timeZone: 'IST' }) + ' (IST)',
        },
    },
    {
        timeStamps: true,
    }
)

const User = mongoose.model('User', userModel);
module.exports = User;


//web hook(to look).. inter-> pusher.. ngrok(proxy for localhost to globally identifiable name)