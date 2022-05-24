const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'b92079jf_sivir', //7
    database: 'b92079jf_sivir', //7
    password: '2xlnU*eq',
});

module.exports = connection;