import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    port: process.env.PORT_DB,
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.MYSQL_DB,
    password: "",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
module.exports = pool.query;