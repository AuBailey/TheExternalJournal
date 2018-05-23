'use strict';

const db = require('../mySql');

/**
 * Get an Entry by id
 * @param {number} entryId 
 */
exports.getEntryById = function (entryId) {
  return new Promise((resolve, reject) => {

    let sql = 'SELECT * FROM Entries WHERE id = ?';
    db.query(sql, [entryId], function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        if (results.length == 0) {
          reject();
          return;
        }
        resolve(results[0]);
      }
    });
  });
}

/**
 * Get all Entries in a Journal
 * @param {number} journalId 
 */
exports.getJournalEntries = function (journalId) {
  return new Promise((resolve, reject) => {
    // Only Get Entries if Journal belongs to user.
    let sql = 'SELECT * FROM Entries WHERE journalId = ?'
    db.query(sql, [journalId], function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
}

/**
 * Save/Create an Entry into a Journal
 * @param {number} journalId 
 * @param {string} name 
 * @param {string} content 
 * @param {float} [lat] 
 * @param {float} [lng]
 * @param {string} [city] 
 */
exports.saveEntry = function (journalId, name, content, lat, lng, city) {
  return new Promise((resolve, reject) => {
    let sql = 'INSERT INTO Entries SET journalId = ?, name = ?, content = ?';
    let data = [journalId, name, content];

    if (lat) {
      sql += ', lat = ?';
      data.push(lat);
    }
    if (lng) {
      sql += ', lng = ?';
      data.push(lng);
    }
    if (city) {
      sql += ', city = ?';
      data.push(city);
    }

    db.query(sql, data, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  })
}

/**
 * Update an Entry by Id
 * @param {number} id 
 * @param {string[]} fields 
 * @param {string[]} values 
 */
exports.updateEntry = function (id, fields, values) {
  return new Promise((resolve, reject) => {
    if (fields.length != values.length) {
      reject("Number of fields and values do not match.")
      return;
    }

    var sql = 'UPDATE Entries SET '
    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
      sql += fields[fieldIndex] + ' = ?'
      if (fieldIndex < fields.length - 1) {
        sql += ",";
      }
      sql += " ";
    }
    sql += 'WHERE `id` = ?'
    values.push(id);

    db.query(sql, values, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Delete an Entry by id
 * @param {number} entryId 
 */
exports.deleteEntryById = function (entryId) {
  return new Promise((resolve, reject) => {

    let sql = 'DELETE FROM Entries WHERE id = ?';
    db.query(sql, [entryId], function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        if (results.affectedRows == 0) {
          reject();
        } else {
          resolve(entryId);
        }
      }
    });
  });
}

/**
 * Resolves if Journal with id belongs to logged in user
 * @param {number} userId 
 * @param {number} journalId 
 */
exports.requireJournalBelongsToUser = function (userId, journalId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Journals WHERE userId = ? AND id = ?', [userId, journalId], function (error, results) {
      if (error) {
        reject(error);
      } else {
        if (results.length == 0) {
          reject();
        } else {
          resolve();
        }
      }
    })
  });
}

/**
 * Resolves if Entry with id belongs to logged in user
 * @param {number} userId 
 * @param {number} entryId 
 */
exports.requireEntryBelongsToUser = function (userId, entryId) {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Entries JOIN Journals J on Entries.journalId = J.id WHERE J.userId = ? AND Entries.id = ?', [userId, entryId], function (error, results) {
      if (error) {
        reject(error);
      } else {
        if (results.length == 0) {
          reject();
        } else {
          resolve();
        }
      }
    })
  });
}