'use strict';

/**
 * SQL Connection
 */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.mysqlHost,
  user: process.env.mysqlUser,
  password: process.env.mysqlPassword,
  database: process.env.mysqlDatabase
});

connection.connect(function (error) {
  if (error) console.log(error);
});

module.exports = connection;