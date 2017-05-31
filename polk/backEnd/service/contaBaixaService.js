var contaBaixaService = (function () {

    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.cmd == "Count") {
            queryString = 'SELECT COUNT(*) AS Total FROM ContaBaixa WHERE Descricao LIKE ?';
        } else {
            queryString = "SELECT * FROM ContaBaixa WHERE Descricao LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Descricao + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }


    var _save = function (db, contaBaixa, callback) {
        if (contaBaixa.CodContaBaixa === "0") {
            delete contaBaixa.CodContaBaixa;
            var query = db.query('INSERT INTO ContaBaixa SET ?', contaBaixa, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  ContaBaixa SET Descricao = ? WHERE CodContaBaixa = ?', [contaBaixa.Descricao, contaBaixa.CodContaBaixa], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM ContaBaixa WHERE CodContaBaixa = ?', [filtro.id], function (err, result) {
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
        exclude: _exclude
    }
})();

module.exports = contaBaixaService;

