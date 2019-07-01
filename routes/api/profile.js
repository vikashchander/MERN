const express = require('express'),
    routes = express.Router();

// @routes Get  api/profile
// @des        Test route
//  @access    Public 


routes.get('/', (req, res) => {
    res.send("profile routes")
})

module.exports = routes;