var direitoAcessoService = (function () {

    var _select = function (db, filtro, callback) {

        var queryString = " select DireitoAcesso.CodGrupoAcesso, " +
                                  " DireitoAcesso.idMenu, " +
                                  " Menu.Nome " +
                          " from DireitoAcesso "+
                          " inner join Menu on DireitoAcesso.idMenu = Menu.idMenu "+
                          " where CodGrupoAcesso = ? "+
                          " order by DireitoAcesso.idMenu"

        //var queryString = 'SELECT * FROM DireitoAcesso WHERE CodGrupoAcesso = ?';
        var list = db.query(queryString, [filtro.CodGrupoAcesso], function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }

     function exists (db, filtro, callback) {
         var queryString = 'SELECT COUNT(*) AS Qtde FROM DireitoAcesso WHERE CodGrupoAcesso = ? AND idMenu=?';
         var list = db.query(queryString, [filtro.CodGrupoAcesso, filtro.idMenu], function (err, rows, fields) {
            if (err) {
                console.log(err);
                throw err
            };
            callback(rows)
        });
    }
 
     var _save = function (db, direitoAcesso, callback) {
         exists(db, direitoAcesso, function (rows) {
             if (rows[0].Qtde == 0) {
                 var query = db.query('INSERT INTO DireitoAcesso SET ?', direitoAcesso, function (err, result) {
                     if (err) {
                         console.log(err);
                         throw err
                     };
                     callback(result);
                 });
             }
         });
    }

    var _exclude = function (db, filtro, callback) {
        var query = db.query('DELETE FROM DireitoAcesso WHERE CodGrupoAcesso = ? AND idMenu = ?', [filtro.CodGrupoAcesso, filtro.idMenu], function (err, result) {
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
module.exports = direitoAcessoService;