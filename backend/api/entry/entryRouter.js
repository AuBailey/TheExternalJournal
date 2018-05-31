const express = require('express'),
    router = express.Router(),
    authController = require('../auth/authController'),
    entryController = require('./entryController'),
    uploadController = require('../upload/uploadController');

router.get('/:entryId(\\d+)', authController.loginRequired, entryController.getJournalEntryById);

router.get('/all/:journalId(\\d+)', authController.loginRequired, entryController.getJournalEntries);

router.post('/', authController.loginRequired, entryController.createEntry);

router.post('/:entryId(\\d+)/upload', authController.loginRequired, entryController.requireEntryBelongsToUser, function(req, res) {
    uploadController.uploadArray(req, res, function(error) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Error Uploading File(s)"
            })
        }

        return res.json({
            success: true
        })
    });
    
    
});

router.put('/', authController.loginRequired, entryController.updateEntry);

router.delete('/', authController.loginRequired, entryController.deleteEntry);

// Need to export the router variable for use in api.js.
module.exports = router;