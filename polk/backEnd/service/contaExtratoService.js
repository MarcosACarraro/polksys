var contaExtratoService = (function () {

    var _extrato = function (db, filtro, callback) {

        if (filtro.dataConsulta) {
            filtro.dataConsulta = new Date(filtro.dataConsulta);
        } else {
            filtro.dataConsulta = null;
        }

        var queryString = "call ContaExtrato(?,?)";
        
        var list = db.query(queryString, [filtro.CodConta,filtro.dataConsulta], function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows[0])
        });
    }

    var _saldos = function (db, filtro, callback) {

        if (filtro.dataConsulta) {
            filtro.dataConsulta = new Date(filtro.dataConsulta);
        } else {
            filtro.dataConsulta = null;
        }

        var queryString = "call ContaSaldos(?,?)";

        var list = db.query(queryString, [filtro.CodConta,filtro.dataConsulta], function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows[0]);
        });
    }

    var _periodos = function (db, filtro, callback) {

        var queryString = "call ContaListaPeriodos()";

        var list = db.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows[0]);
        });
    }

    return {
        extrato: _extrato,
        saldos: _saldos,
        periodos: _periodos
    }

})();

module.exports = contaExtratoService;