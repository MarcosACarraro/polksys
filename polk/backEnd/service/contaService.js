var contaService = (function () {

    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.cmd == "Count") {
            queryString = 'SELECT COUNT(*) AS Total FROM Conta WHERE Descricao LIKE ?';
        } else {
            queryString = "SELECT * FROM Conta WHERE Descricao LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Descricao + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, conta, callback) {
        if (conta.CodConta === "0") {
            delete conta.CodConta;
            var query = db.query('INSERT INTO Conta SET ?', conta, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  Conta SET Descricao = ?  WHERE CodConta = ?', [conta.Descricao, conta.CodConta], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM Conta WHERE CodConta = ?', [filtro.id], function (err, result) {
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

module.exports = contaService;

