var contaContabilService = (function () {

    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.cmd == "Count") {
            queryString = 'SELECT COUNT(*) AS Total FROM ContaContabil WHERE Descricao LIKE ?';
        } else {
            queryString = "SELECT * FROM ContaContabil WHERE Descricao LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Descricao + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, contaContabil, callback) {
        if (contaContabil.CodContaContabil === "0") {
            delete contaContabil.CodContaContabil;
            var query = db.query('INSERT INTO ContaContabil SET ?', contaContabil, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  ContaContabil SET Descricao = ?  WHERE CodContaContabil = ?', [contaContabil.Descricao, contaContabil.CodContaContabil], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM ContaContabil WHERE CodContaContabil = ?', [filtro.id], function (err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            callback();
        });
    }

    return {
        select: _select,
        save: _save,
        exclude: _exclude,
    }
})();

module.exports = contaContabilService;

