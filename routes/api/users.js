const express = require('express'),
    router = express.Router(),
    config = require('config'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    gravatar = require('gravatar'),
    {
        check,
        validationResult
    } = require('express-validator'),
    User = require('../../models/Users');


// @routes Post  api/users
// @des        Test route
//  @access    Users

router.post('/', [
    check('name').not().isEmpty(),
    // username must be an email
    check('email', "please include  a valid email").isEmail(),
    // password must be at least 5 chars long
    check('password', 'character length must be 6').isLength({
        min: 6
    })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        email,
        name,
        password
    } = req.body
    try {
        let userData = await User.findOne({
            email
        });
        if (userData) {
            return res.status(400).send({
                error: [{
                    msg: 'User already exist'
                }]
            });
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        userData = new User({
            name,
            password,
            email,
            avatar
        });
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);
        await userData.save();
        //res.send("user registered");
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

module.exports = router;