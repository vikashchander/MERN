const express = require('express'),
    routes = express.Router();

// @routes Get  api/posts
// @des        Test route
//  @access    Posts

routes.get('/ ', (req, res) => {
    res.send("posts routes")
})

module.exports = routes;