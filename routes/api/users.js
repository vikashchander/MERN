const express = require('express'),
    router = express.Router(),
    {
        check,
        validationResult
    } = require('express-validator');

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
], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    console.log(req.body)
    res.send("users routes");
})

module.exports = router;