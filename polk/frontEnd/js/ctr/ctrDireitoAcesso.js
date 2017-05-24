var ctrDireitoAcesso = (function () {
    var _CodGrupoAcesso = 0;
    var _idMenu ="";
    var _ddlMenus = {};
    var _datasource = [];
    var _datasourceMenus = [];
    var _CodGrupoAcesso = 0;

    var _create = function (id) {
        _CodGrupoAcesso = id;
        createEdit();
        createTable();

        _confirmDeleteDireitoAcesso = ConfirmDelete();
        _confirmDeleteDireitoAcesso.create("editDireito", "DireitoAcesso");

    }

    function createEdit() {
        var item = document.createElement("option");
        item.text = "Selecione um Menu";
        item.value = 0;

        _ddlMenus = window.document.getElementById("ddlMenus");
        _ddlMenus.appendChild(item);
        _loadMenus();
    }

    function _load() {
        $.ajax({
            async: true,
            cache: false,
            url: "direitosAcesso",
            type: "GET",
            data: {
                cmd: "Select",
                CodGrupoAcesso: _CodGrupoAcesso
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    _datasource = JSON.parse(data);
                    _tableDataBind.call(this);
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    function createTable() {
        /*table vai na div principal*/

        var _tableContainer = window.document.getElementById("tableDireitoContainer");
        var _tbDireitoAcesso = window.document.getElementById("tbDireitoAcesso");
        if (_tbDireitoAcesso) _tbDireitoAcesso.remove();
        _table = window.document.createElement("table");
        _table.setAttribute("id", "tbDireitoAcesso")
        _table.setAttribute("class", "table table-striped table-hover table-responsive");

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Menu";
        cell2.innerHTML = "Excluir";
        _tableContainer.appendChild(_table);

        _load();

        _tableDataBind.call(this);
    }

    var _tableDataBind = function () {
        _limpar.call(this);
        var linha = 0;
        for (var i = 0; i < _datasource.length; i++) {
            linha++;
            var row = _table.insertRow(linha);
            var cell0 = row.insertCell(0);
            cell0.setAttribute("width", "30px");

            var cell1 = row.insertCell(1);

            var cell2 = row.insertCell(2);
            cell2.setAttribute("width", "30px");
            cell2.setAttribute("align", "center");

            cell0.innerHTML = _datasource[i].CodGrupoAcesso;
            cell1.innerHTML = _datasource[i].Nome;
            cell2.innerHTML = "<a href='#' onClick='ctrDireitoAcesso.confirm(" + _datasource[i].CodGrupoAcesso + "," + _datasource[i].idMenu + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    function _loadMenus() {
        $.ajax({
            async: true,
            cache: false,
            url: "/menus",
            type: "GET",
            data: {
                cmd: "Select",
                CodGrupoAcesso: _CodGrupoAcesso
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    _datasourceMenus = JSON.parse(data);
                    _MenuDataBind.call(this);
                }
            },
            error: function () {
                alert('Erro carregar registros cidades!');
            }
        });
    }

    var _MenuDataBind = function () {
        $(_ddlMenus).empty();
        for (var i = 0; i < _datasourceMenus.length; i++) {
            var item = document.createElement("option");
            item.text = _datasourceMenus[i].Nome;
            item.value = _datasourceMenus[i].idMenu;
            _ddlMenus.appendChild(item);
        }
    }

    var _save = function () {
        
        item = {
            CodGrupoAcesso: _CodGrupoAcesso,
            idMenu: _ddlMenus.options[_ddlMenus.selectedIndex].value
        };
        $.ajax({
            async: true,
            cache: false,
            url: "direitoAcesso",
            type: "POST",
            data: item,
            datatype: "JSON",
            success: function (response) {
                _load();
                _loadMenus();
                //alert(response.success);
            },
            error: function () {
                alert('Erro ao salvar!');
            }
        });
    }

    var _confirm = function (CodGrupoAcesso, idMenu) {
        _CodGrupoAcesso = CodGrupoAcesso;
        _idMenu = idMenu;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodGrupoAcesso === _CodGrupoAcesso && _datasource[i].idMenu == _idMenu) {
                _confirmDeleteDireitoAcesso.setMessage(_datasource[i].idMenu);
            }
        }
        _confirmDeleteDireitoAcesso.show();
    }

    var _removeAt = function () {
        _deleteDB();
        _idMenu = "";
        _load();
        _loadMenus();
        _confirmDeleteDireitoAcesso.hide();
    }

    function _deleteDB() {
        $.ajax({
            async: true,
            cache: false,
            url: "direitosAcesso",
            type: "GET",
            data: {
                cmd: "Delete",
                CodGrupoAcesso: _CodGrupoAcesso,
                idMenu: _idMenu
            },
            datatype: "JSON",
            success: function (response) {
                //alert(response.success);
            },
            error: function () {
                alert('Erro ao Deletar!');
            }
        });
    }


    return {
        create: _create,
        save: _save,
        confirm: _confirm,
        removeAt: _removeAt
    }

})();