const jwt = require('jsonwebtoken'),
    config = require('config');

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({
            msg: 'no token , auth is denied'
        });
    }
    try {
        const decode = jwt.verify(token, config.get('jwtToken'));
        console.log(`${decode.userData.id}`);
        req.userData = decode.userData;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'invalid token'
        });
    }
}

module.exports = auth;