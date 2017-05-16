var clienteService = (function () {
    var _inserted = 0;

    var _totalRecords = function (db, callback) {
        var queryString = 'SELECT COUNT(*) AS Total FROM Cliente';
        var list = db.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.cmd == "Count") {
            queryString = 'SELECT COUNT(*) AS Total FROM Cliente WHERE Nome LIKE ?';
        } else {
            queryString = "SELECT * FROM Cliente WHERE Nome LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.NomeCliente + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }
 

    var _save = function (db, cliente, callback) {
       

        if (cliente.CodCliente === "0") {
            delete cliente.CodCliente;
            if (cliente.DataNasc) cliente.DataNasc = new Date(cliente.DataNasc);
            cliente.CodProfissao = (cliente.CodProfissao > 0) ? cliente.CodProfissao : null;
            cliente.CodCidade = (cliente.CodCidade > 0) ? cliente.CodCidade : null;
            cliente.CodBairro = (cliente.CodBairro > 0) ? cliente.CodBairro : null;
            var query = db.query('INSERT INTO Cliente SET ?', cliente, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var dataNasc = null;
            
            if (cliente.DataNasc) dataNasc = new Date(cliente.DataNasc);
            var codProf = (cliente.CodProfissao > 0) ? cliente.CodProfissao : null;
            var codCid = (cliente.CodCidade > 0) ? cliente.CodCidade : null;
            var codBai = (cliente.CodBairro > 0) ? cliente.CodBairro : null;

            var query = db.query("UPDATE  Cliente SET " +
                                  " Nome = ? ," +
                                  " Endereco = ? ," +
                                  " CEP = ? , " +
                                  " FoneCom = ? , " +
                                  " FoneRes = ? , " +
                                  " Celular = ? , " +
                                  " Email = ? , " +
                                  " RG = ? , " +
                                  " CPF = ? , " +
                                  " Sexo = ? , " +
                                  " Situacao = ? , " +
                                  " EstadoCivil = ? , " +
                                  " DataNasc = ? , " +
                                  " CodProfissao = ? , " +
                                  " CodCidade = ? , " +
                                  " CodBairro = ? , " +
                                  " Obs = ?  " +
                                  " WHERE CodCliente = ?",
                                  [cliente.Nome,
                                   cliente.Endereco,
                                   cliente.CEP,
                                   cliente.FoneCom,
                                   cliente.FoneRes,
                                   cliente.Celular,
                                   cliente.Email,
                                   cliente.RG,
                                   cliente.CPF,
                                   cliente.Sexo,
                                   cliente.Situacao,
                                   cliente.EstadoCivil,
                                   dataNasc,
                                   codProf,
                                   codCid,
                                   codBai,
                                   cliente.Obs,
                                   cliente.CodCliente],
                                   function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM Cliente WHERE CodCliente = ?', [filtro.id], function (err, result) {
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

module.exports = clienteService;


