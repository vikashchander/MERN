const express = require('express'),
    routes = express.Router();

// @routes Get  api/auth
// @des        Test route
//  @access    Auth

routes.get('/', (req, res) => {
    res.send("auth routes")
})

module.exports = routes;