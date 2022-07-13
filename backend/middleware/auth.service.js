const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const Token = authHeader && authHeader.split(' ')[1];
    if (Token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

module.exports =  { authenticateToken }