const mongoose = require('mongoose');

const userModel = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
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
        contacts: {
            type: Array,
        }
    },//pending req...accepted req
    {
        timeStamps: true,
    }
)

const User = mongoose.model('User', userModel);
module.exports = User;


//web hook(to look).. inter-> pusher.. ngrok(proxy for localhost to globally identifiable name)