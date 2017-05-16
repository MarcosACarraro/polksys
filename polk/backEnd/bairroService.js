var bairroService = (function () {
    var _select = function (db, filtro, callback) {
        var queryString = 'SELECT * FROM Bairro WHERE CodCidade = ?';
        var list = db.query(queryString, [filtro.CodCidade], function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, bairro, callback) {
        if (bairro.CodBairro === 0) {
            delete bairro.CodBairro;
            var query = db.query('INSERT INTO Bairro SET ?', bairro, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  Bairro SET NomeBairro = ?, CodCidade = ?  WHERE CodBairro = ?', [bairro.NomeBairro, bairro.CodCidade,bairro.CodBairro], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _delete = function (db, id, callback) {
        var query = db.query('DELETE FROM Bairro WHERE CodBairro = ?', [id], function (err, result) {
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
        delete: _delete,
    }
})();

module.exports = bairroService;

