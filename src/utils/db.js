let mysql = require ("mysql");

let connection = mysql.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });
  console.log(`username, ${process.env.DB_USERNAME} password, ${process.env.DB_PASSWORD} host, ${process.env.DB_HOST} port, ${process.env.DB_PORT} db_name, ${process.env.DB_NAME}`);
  module.exports = connection;