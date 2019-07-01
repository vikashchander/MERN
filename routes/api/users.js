const express = require('express'),
    router = express.Router();

// @routes Get  api/users
// @des        Test route
//  @access    Users

router.get('/', (req, res) => {
    res.send("users routes");
})

module.exports = router;