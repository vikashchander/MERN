const express = require('express'),
    auth = require('../../middleware/auth'),
    User = require('../../models/Users'),
    routes = express.Router();

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
    res.send("auth routes")
})

module.exports = routes;