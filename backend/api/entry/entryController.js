'use strict';

const entryModel = require('./entryModel');

exports.getSharedEntry = function (req, res) {
  entryModel.getEntryById(req.params.entryId).then(function (entry) {
    return res.send(entry.content);
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to retrieve Entry with id: " + req.params.entryId
    });
  })
}

exports.sharedRequired = function (req, res, next) {
  if (!req.params.entryId) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid entryId required.'
    });
  }
  entryModel.getEntryById(req.params.entryId).then((entry) => {
    if (entry.isShared) {
      next();
    } else {
      return res.status(401).json({
        'success': false,
        'message': 'Unauthorized Access!'
      });
    }
  }).catch((error) => {
    return res.status(500).json({
      'success': false,
      'message': 'Unable to retrieve entry!'
    });
  })
};

/**
 * Get Entry by Id
 * @param {*} req 
 * @param {*} res 
 */
exports.getJournalEntryById = function (req, res) {
  if (!req.params.entryId) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid entryId required.'
    });
  }

  entryModel.requireEntryBelongsToUser(req.user.id, req.params.entryId).then(function () {
    entryModel.getEntryById(req.params.entryId).then(function (entry) {
      return res.json({
        'success': true,
        'data': {
          'entry': entry
        }
      });
    }).catch((error) => {
      return res.status(400).json({
        'success': false,
        'message': "Unable to retrieve Entry with id: " + req.params.entryId
      });
    })
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to retrieve Entry with id: " + req.params.entryId
    });
  })
}

/**
 * Get all Entries from journal with specified Id
 * @param {*} req 
 * @param {*} res 
 */
exports.getJournalEntries = function (req, res) {
  if (!req.params.journalId) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid journalId required.'
    });
  }

  entryModel.requireJournalBelongsToUser(req.user.id, req.params.journalId).then(function () {
    entryModel.getJournalEntries(req.params.journalId).then(function (entries) {
      return res.json({
        'success': true,
        'data': {
          'entries': entries
        }
      });
    }).catch((error) => {
      return res.status(400).json({
        'success': false,
        'message': "Unable to retrieve the user's journal entries."
      });
    })
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to retrieve the user's journal entries."
    });
  })
}

/**
 * Create an Entry
 * @param {*} req 
 * @param {*} res 
 */
exports.createEntry = function (req, res) {
  if (!(req.body.journalId && req.body.entryName && req.body.entryContent)) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid journalId, entryName, and entryContent required.'
    });
  }

  entryModel.requireJournalBelongsToUser(req.user.id, req.body.journalId).then(function () {
    let entryCity;
    if (req.body.entryLat && req.body.entryLong) {
      // TODO: Get entryCity from lat and long if provided
    }

    entryModel.saveEntry(req.body.journalId, req.body.entryName, req.body.entryContent, req.body.entryLat, req.body.entryLong, entryCity).then(function (entryId) {
      return res.json({
        'success': true,
        'data': {
          'entryId': entryId
        }
      });
    }).catch((error) => {
      return res.status(400).json({
        'success': false,
        'message': "Unable to create Entry."
      });
    })
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to create Entry."
    });
  })
}

/**
 * Update an Entry
 * @param {*} req 
 * @param {*} res 
 */
exports.updateEntry = function (req, res) {
  if (!req.body.entryId ||!(req.body.entryName || req.body.entryContent || req.body.isShared)) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid entryId and at least one of the following are required: entryName, entryContent, isShared.'
    });
  }

  entryModel.requireEntryBelongsToUser(req.user.id, req.body.entryId).then(function () {
    let columns = [];
    let data = [];

    if (req.body.entryName) {
      columns.push('name');
      data.push(req.body.entryName);
    }
    if (req.body.entryContent) {
      columns.push('content');
      data.push(req.body.entryContent);
    }
    if (req.body.isShared) {
      columns.push('isShared');
      data.push(req.body.isShared);
    }
    if (req.body.entryLat) {
      columns.push('lat');
      data.push(req.body.entryLat);
    }
    if (req.body.entryLong) {
      columns.push('lng');
      data.push(req.body.entryLong);
    }

    if (req.body.entryLat && req.body.entryLong) {
      // TODO: Get entryCity from lat and long if provided
    }

    entryModel.updateEntry(req.body.entryId, columns, data).then(function (updateInfo) {
      return res.json({
        'success': true,
        'data': {
          'entryId': req.body.entryId
        }
      });
    }).catch((error) => {
      return res.status(400).json({
        'success': false,
        'message': "Unable to update entry."
      });
    })
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to update entry."
    });
  })
}

/**
 * Delete an Entry
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteEntry = function (req, res) {
  if (!req.body.entryId) {
    return res.status(400).json({
      'success': false,
      'message': 'Valid entryId required.'
    });
  }

  entryModel.requireEntryBelongsToUser(req.user.id, req.body.entryId).then(function () {
    entryModel.deleteEntryById(req.body.entryId).then(function (entryId) {
      return res.json({
        'success': true,
        'data': {
          'deletedEntryId': entryId
        }
      });
    }).catch((error) => {
      return res.status(400).json({
        'success': false,
        'message': "Unable to delete entry with id: " + req.body.entryId
      });
    })
  }).catch((error) => {
    return res.status(400).json({
      'success': false,
      'message': "Unable to delete entry with id: " + req.body.entryId
    });
  })
}