var contaLancamentoService = (function () {

    var _select = function (db, filtro, callback) {
        var queryString = "";
        if (filtro.cmd == "Count") {
            queryString = " SELECT COUNT(*) AS Total " +
                          " FROM ContaLancamento " +
                          " LEFT JOIN ContaBaixa ON ContaLancamento.CodContaLancamento = ContaBaixa.CodContaLancamento " +
                          " WHERE ContaBaixa.Situacao is NULL "
                          " AND ContaLancamento.Descricao LIKE ?";
        } else {

            queryString = " SELECT ContaLancamento.CodContaLancamento, " +
                          " ContaLancamento.Descricao,  "+
                          " ContaLancamento.DataEmissao,  "+
                          " ContaLancamento.DataVencimento, "+
                          " ContaLancamento.Valor " +
                          " FROM ContaLancamento " +
                          " LEFT JOIN ContaBaixa ON ContaLancamento.CodContaLancamento = ContaBaixa.CodContaLancamento " +
                          " WHERE ContaBaixa.Situacao is NULL "
                          " AND ContaLancamento.Descricao LIKE ? limit " + filtro.skip + "," + filtro.take;
        }
        var list = db.query(queryString, '%' + filtro.Descricao + '%', function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }


    var _save = function (db, contaLancamento, callback) {
        if (contaLancamento.CodContaLancamento === "0") {
            delete contaLancamento.CodContaLancamento;

            if (contaLancamento.DataEmissao) {
                contaLancamento.DataEmissao = new Date(contaLancamento.DataEmissao);
            } else {
                contaLancamento.DataEmissao = null;
            }

            if (contaLancamento.DataVencimento) {
                contaLancamento.DataVencimento = new Date(contaLancamento.DataVencimento);
            } else {
                contaLancamento.DataVencimento = null;
            }

            var query = db.query('INSERT INTO ContaLancamento SET ?', contaLancamento, function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        } else {


            if (contaLancamento.DataEmissao) {
                contaLancamento.DataEmissao = new Date(contaLancamento.DataEmissao);
            } else {
                contaLancamento.DataEmissao = null;
            }

            if (contaLancamento.DataVencimento) {
                contaLancamento.DataVencimento = new Date(contaLancamento.DataVencimento);
            } else {
                contaLancamento.DataVencimento = null;
            }

            var query = db.query(" UPDATE  ContaLancamento SET " +
                                 " Descricao = ? ," +
                                 " DataEmissao = ? ," +
                                 " DataVencimento = ? ," +
                                 " Valor = ? " +
                                 " WHERE CodContaLancamento = ?",
                                 [contaLancamento.Descricao,
                                  contaLancamento.DataEmissao,
                                  contaLancamento.DataVencimento,
                                  parseFloat(contaLancamento.Valor),
                                  contaLancamento.CodContaLancamento], function (err, result) {
                if (err) {
                    console.log(err);
                    throw err
                };
                callback(result);
            });
        }
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM ContaLancamento WHERE CodContaLancamento = ?', [filtro.id], function (err, result) {
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

module.exports = contaLancamentoService;

