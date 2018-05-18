'use strict';

const journalModel = require('./journalModel');

/**
 * Get a Journal by id, if it belongs to logged in user.
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserJournalByid = function (req, res) {
  if (!req.params.journalId) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid journalId required.'
    });
  }

  journalModel.getJournalById(req.params.journalId, req.user.id).then(function (journal) {
    return res.json({
      'success': true,
      'data': {
        'journal': journal
      }
    });
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to retrieve journal with id: " + req.params.journalId
    });
  })
}

/**
 * Get User's Journals
 * @param {*} req 
 * @param {*} res 
 */
exports.getUsersJournals = function (req, res) {
  journalModel.getUsersJournals(req.user.id).then(function (journals) {
    return res.json({
      'success': true,
      'data': {
        'journals': journals
      }
    });
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to retrieve the user's journals."
    });
  })
}

/**
 * Create a new Journal
 * @param {*} req 
 * @param {*} res 
 */
exports.createJournal = function (req, res) {
  if (!req.body.journalName) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid journalName required.'
    });
  }

  journalModel.saveJournal(req.body.journalName, req.user.id).then(function (journalId) {
    return res.json({
      'success': true,
      'data': {
        'journalId': journalId
      }
    });
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to create Journal."
    });
  })
}

/**
 * Update a Journal's Name
 * @param {*} req 
 * @param {*} res 
 */
exports.updateJournal = function (req, res) {
  if (!(req.body.journalId && req.body.journalName)) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid journalId and journalName required.'
    });
  }

  journalModel.updateJournal(req.body.journalId, req.user.id, ['name'], [req.body.journalName]).then(function (updateInfo) {
    return res.json({
      'success': true,
      'data': {
        'journalId': req.body.journalId
      }
    });
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to update journal."
    });
  })
}

/**
 * Delete a Journal
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteJournal = function (req, res) {
  if (!req.body.journalId) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid journalId required.'
    });
  }

  journalModel.deleteJournalById(req.body.journalId, req.user.id).then(function (journalId) {
    return res.json({
      'success': true,
      'data': {
        'deletedJournalId': journalId
      }
    });
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to delete journal with id: " + req.body.journalId
    });
  })

}