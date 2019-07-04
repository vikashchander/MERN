const express = require('express'),
    routes = express.Router(),
    config = require('config'),
    auth = require('../../middleware/auth'),
    User = require('../../models/Users'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    {
        check,
        validationResult
    } = require('express-validator');


// @routes Get  api/auth
// @des        Test route
//  @access    Auth

routes.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userData.id).select('-password');
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }

});

routes.post('/', [
    check('email', "please include  a valid email").isEmail(),

    check('password', 'password required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        email,
        password
    } = req.body
    try {
        let userData = await User.findOne({
            email
        });
        if (!userData) {
            return res.status(400).json({
                error: [{
                    msg: 'Invalid Password'
                }]
            });
        }
        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({
                error: [{
                    msg: 'Invalid Password'
                }]
            });
        }
        const payload = {
            userData: {
                id: userData.id
            }
        }
        jwt.sign(
            payload,
            config.get("jwtToken"), {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                })
            });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
    }
})

module.exports = routes;