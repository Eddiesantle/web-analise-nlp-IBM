const mysql = require('mysql2')

const pool = mysql.createPool({
    "connectionLimit": process.env.MYSQL_CONNLIMIT,
    "password": process.env.MYSQL_PASSWORD,
    "user": process.env.MYSQL_USER,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
})

/* const pool = mysql.createPool({
    "connectionLimit": 10,
    "password": '',
    "user": "root",
    "database": "pnl_analysis",
    "host": "localhost",
    "port": 3306
}) */
exports.pool = pool