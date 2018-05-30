const express = require('express'),
    router = express.Router(),
    authController = require('../auth/authController'),
    uploadController = require('./uploadController');

router.post('/', authController.loginRequired, uploadController.upload.array('images'), function(req, res) {
    return res.json({
        
    })
});

// Need to export the router variable for use in api.js.
module.exports = router;