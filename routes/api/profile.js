const express = require('express'),
    routes = express.Router(),
    auth = require('../../middleware/auth'),
    profile = require('../../models/profile'),
    user = require('../../models/Users');

// @routes Get  api/profile
// @des        Test route
//  @access    Public 


routes.get('/me', auth, async (req, res) => {
    try {
        const data = profile.findOne({
            user: req.userData.id
        }).populate('user', ['name', 'avator']);
        if (!data) {
            return res.status(400).json({
                msg: ' no user profile data found'
            })
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = routes;