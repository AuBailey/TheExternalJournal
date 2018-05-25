'use strict';

/**
 * SQL Connection
 */
const mysql = require('mysql');

function getConnection() {
  const connection = mysql.createConnection({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDatabase
  });

  connection.connect(function (error) {
    if (error) console.error(error);
  });
  return connection;
}


module.exports = getConnection();