const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300d' });
}

module.exports = generateToken;