var mysql = require('mysql');

var connection = (function () {
    var _db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "100senha",
        database: "bd_Sistema"
    });

    return {
        db: _db
    }
})();

module.exports = connection;
