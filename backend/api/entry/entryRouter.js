const express = require('express'),
    router = express.Router(),
    authController = require('../auth/authController'),
    entryController = require('./entryController');

router.get('/:entryId(\\d+)', authController.loginRequired, entryController.getJournalEntryById);

router.get('/shared/:entryId(\\d+)', entryController.getSharedEntry);

router.get('/all/:journalId(\\d+)', authController.loginRequired, entryController.getJournalEntries);

router.post('/', authController.loginRequired, entryController.createEntry);

router.put('/', authController.loginRequired, entryController.updateEntry);

router.delete('/', authController.loginRequired, entryController.deleteEntry);

// Need to export the router variable for use in api.js.
module.exports = router;