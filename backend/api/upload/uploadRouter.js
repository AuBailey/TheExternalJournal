const express = require('express'),
    router = express.Router(),
    authController = require('../auth/authController'),
    entryController = require('../entry/entryController');

router.post('/', function(req, res){
  if(req.files.image !== undefined){ // `image` is the field name from your form
      res.redirect("/uploads"); // success
  }else{
      res.send("error, no file chosen");
  }
});

// Need to export the router variable for use in api.js.
module.exports = router;