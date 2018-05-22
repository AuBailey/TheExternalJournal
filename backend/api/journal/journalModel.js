'use strict';

const db = require('../mySql');

/**
 * Get Journal by its id, if it belongs to user of userId.
 * @param {number} journalId 
 * @param {number} userId 
 */
exports.getJournalById = function (journalId, userId) {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Journals WHERE id = ? AND userId = ?', [journalId, userId], function (error, results, fields) {
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
};

/**
 * Get the Journals of user with userId
 * @param {number} userId 
 */
exports.getUsersJournals = function(userId) {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Journals WHERE userId = ?', [userId], function(error, results, fields) {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      })
  })
}

/**
 * 
 * @param {string} journalName 
 * @param {string} userId 
 */
exports.saveJournal = function (journalName, userId) {
  return new Promise((resolve, reject) => {
      db.query('INSERT INTO Journals SET name = ?, userId = ?', [journalName, userId], function (error, results, fields) {
          if (error) {
              reject(error);
          } else {
              resolve(results.insertId);
          }
      });
  });
}

/**
 * Update a Journal by id, if it belongs to user of userId.
 * @param {number} id 
 * @param {number} userId 
 * @param {string[]} fields 
 * @param {string[]} values 
 */
exports.updateJournal = function (id, userId, fields, values) {
  return new Promise((resolve, reject) => {
      if (fields.length != values.length) {
          reject("Number of fields and values do not match.")
      }
      var sql = 'UPDATE Journals SET '
      for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
          sql += fields[fieldIndex] + ' = ?'
          if (fieldIndex < fields.length - 1) {
              sql += ",";
          }
          sql += " ";
      }
      sql += 'WHERE `id` = ? AND `userId` = ?'
      values.push(id);
      values.push(userId)

      db.query(sql, values, function (error, results, fields) {
          if (error) {
              reject(error);
          } else {
              if (results.changedRows == 0) {
                  reject();
              } else {
                  resolve(results);                    
              }
          }
      });
  });
};

/**
 * Delete a journal by id, if it belongs to user of userId.
 * @param {number} journalId 
 * @param {number} userId 
 */
exports.deleteJournalById = function (journalId, userId) {
  return new Promise((resolve, reject) => {
      db.query('DELETE FROM Journals WHERE id = ? AND userId = ?;', [journalId, userId], function (error, results, fields) {
          if (error) {
              reject(error);
          } else {
              if (results.affectedRows == 0) {
                  reject();
              } else {
                  resolve(journalId);
              }
          }
      });
  })
};