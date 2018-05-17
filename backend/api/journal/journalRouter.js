const express = require('express'),
    router = express.Router(),
    authController = require('../auth/authController'),
    journalController = require('./journalController');

router.get('/:journalId(\\d+)', authController.loginRequired, journalController.getUserJournalByid);

router.get('/all', authController.loginRequired, journalController.getUsersJournals);

router.post('/', authController.loginRequired, journalController.createJournal);

router.put('/', authController.loginRequired, journalController.updateJournal);

router.delete('/', authController.loginRequired, journalController.deleteJournal);

// Need to export the router variable for use in api.js.
module.exports = router;