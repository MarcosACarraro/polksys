var cidadeService = (function () {
    var _inserted = 0;

    var _totalRecords = function (db, callback) {
        var queryString = 'SELECT COUNT(*) AS Total FROM Cidade';
        var list = db.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _select = function (db, filtro, callback) {

        //console.log(filtro);
        var queryString = "";
        if (filtro.cmd =="Count") {
            queryString = 'SELECT COUNT(*) AS Total FROM Cidade WHERE NomeCidade LIKE ?';
        } else {
            queryString = "SELECT * FROM Cidade WHERE NomeCidade LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.NomeCidade + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _getById = function (db, id, callback) {
        var queryString = "SELECT * FROM Cidade WHERE CodCidade = ?";
        var list = db.query(queryString, id, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _save = function (db, cidade, callback) {
        if (cidade.CodCidade === "0") {
            delete cidade.CodCidade;
            var query = db.query('INSERT INTO Cidade SET ?', cidade, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var query = db.query('UPDATE  Cidade SET NomeCidade = ? ,Estado = ? WHERE CodCidade = ?', [cidade.NomeCidade, cidade.Estado,cidade.CodCidade], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM Cidade WHERE CodCidade = ?', [filtro.id], function (err, result) {
            callback(err, result);
        });
    }

    return {
        select: _select,
        save: _save,
        exclude: _exclude,
        totalRecords: _totalRecords,
        getById: _getById
     }
})();

module.exports = cidadeService;

