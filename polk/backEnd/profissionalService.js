var profissionalService = (function () {


    var _logar = function (db, filtro, callback) {
        var queryString = "SELECT CodProfissional,Nome,CodGrupoAcesso FROM Profissional WHERE Login = ? AND Senha = ?";
        var list = db.query(queryString, [filtro.Login, filtro.Senha], function (err, rows, fields) {
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
            queryString = 'SELECT COUNT(*) AS Total FROM Profissional WHERE Nome LIKE ?';
        } else {
            queryString = "SELECT * FROM Profissional WHERE Nome LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Nome + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }


    var _save = function (db, profissional, callback) {
        if (profissional.CodProfissional === "0") {
            delete profissional.CodProfissional;
            if (profissional.DataNasc) {
                profissional.DataNasc = new Date(profissional.DataNasc);
            } else {
                profissional.DataNasc = null;
            }
            profissional.CodCidade = (profissional.CodCidade > 0) ? profissional.CodCidade : null;
            profissional.CodBairro = (profissional.CodBairro > 0) ? profissional.CodBairro : null;
            profissional.CodGrupoAcesso = (profissional.CodGrupoAcesso > 0) ? profissional.CodGrupoAcesso : null;

            var query = db.query('INSERT INTO Profissional SET ?', profissional, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {
            var dataNasc = null;

            if (profissional.DataNasc) dataNasc = new Date(profissional.DataNasc);
            var codCid = (profissional.CodCidade > 0) ? profissional.CodCidade : null;
            var codBai = (profissional.CodBairro > 0) ? profissional.CodBairro : null;
            var codGrupo = (profissional.CodGrupoAcesso > 0) ? profissional.CodGrupoAcesso : null;

            var query = db.query("UPDATE  Profissional SET " +
                                  " Login = ? ," +
                                  " Nome = ? ," +
                                  " Senha = ? ," +
                                  " CodGrupoAcesso = ? ," +
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
                                  " CodCidade = ? , " +
                                  " CodBairro = ? , " +
                                  " Obs = ?  " +
                                  " WHERE CodProfissional = ?",
                                  [profissional.Login,
                                   profissional.Nome,
                                   profissional.Senha,
                                   codGrupo,
                                   profissional.Endereco,
                                   profissional.CEP,
                                   profissional.FoneCom,
                                   profissional.FoneRes,
                                   profissional.Celular,
                                   profissional.Email,
                                   profissional.RG,
                                   profissional.CPF,
                                   profissional.Sexo,
                                   profissional.Situacao,
                                   profissional.EstadoCivil,
                                   dataNasc,
                                   codCid,
                                   codBai,
                                   profissional.Obs,
                                   profissional.CodProfissional],
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
        var query = db.query('DELETE FROM Profissional WHERE CodProfissional = ?', [filtro.id], function (err, result) {
            if (err) {
                console.log(err);
                throw err
            };
            callback();
        });
    }

    return {
        logar:_logar,
        select: _select,
        save: _save,
        exclude: _exclude
    }
})();

module.exports = profissionalService;


