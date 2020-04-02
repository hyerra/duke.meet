const mysql = require('mysql');

const executeQuery = sql => {
    const connection = mysql.createConnection({
        host: 'localhost',
        database: 'dukemeet',
        user: 'root',
        password: 'password',
        port: 3306,
        insecureAuth: true
    });

    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) return reject(err);
            connection.query(sql, function(error, results, fields) {
                connection.end((err) => {
                    if (error) return reject(error);
                    return resolve(results);
                });
            });
        });
    });
};

module.exports = {
    executeQuery
};