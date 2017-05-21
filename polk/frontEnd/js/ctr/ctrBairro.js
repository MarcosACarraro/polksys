var ctrBairro = (function () {
    var _table = {};
    var _idCidade = 0;
    var _datasource = [];
    var _txtNomeBairro = {};
    var _confirmDeleteBairro = {};

    var _create = function (id) {

        _confirmDeleteBairro = ConfirmDelete();
        _confirmDeleteBairro.create("editBairro", "Bairro");

        _idCidade = id;
        createTable();
        createEdit();
    }

    function createEdit() {
        _txtNomeBairro = window.document.getElementById("txtNomeBairro");
        _txtNomeBairro.onchange = _txtNomeBairroValidade;
        _txtNomeBairro.onkeyup = _txtNomeBairroValidade;
        _txtNomeBairro.setAttribute("maxlength", "50");
        _resetValidation.call(this);
    }

    function createTable() {
        /*table vai na div principal*/
   
        var _divTableBairro = window.document.getElementById("divTableBairro");
   
        _table = window.document.getElementById("BairroTable");
        if (_table) _table.remove();

        _table = window.document.createElement("table");
        _table.setAttribute("class", "table table-striped table-hover table-responsive");
        _table.setAttribute("id", "BairroTable")

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Nome Bairro";
        cell2.innerHTML = "Editar";
        cell3.innerHTML = "Excluir";
        _divTableBairro.appendChild(_table);

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

            var cell3 = row.insertCell(3);
            cell3.setAttribute("width", "30px");
            cell3.setAttribute("align", "center");

            cell0.innerHTML = _datasource[i].CodBairro;
            cell1.innerHTML = _datasource[i].NomeBairro;
            cell2.innerHTML = "<a href='#' onClick='ctrBairro.editAt(" + _datasource[i].CodBairro + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell3.innerHTML = "<a href='#' onClick='ctrBairro.confirm(" + _datasource[i].CodBairro + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }


    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    var _NewBairro = function () {
        _idEdit = 0;
        _txtNomeBairro.value = "";
        $("#editCollapseBairro").collapse('hide');
        $("#editCollapseItemBairro").collapse('show');
        $("#btnNewBairro").hide();
    }

    var _editClose = function () {
        $("#editCollapseBairro").collapse('show');
        $("#editCollapseItemBairro").collapse('hide');
        $("#btnNewBairro").show();
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodBairro === id) {
                _txtNomeBairro.value = _datasource[i].NomeBairro;
                _idEdit = id;
            }
        }
        $("#editCollapseBairro").collapse('hide');
        $("#editCollapseItemBairro").collapse('show');
        $("#btnNewBairro").hide();
        _resetValidation.call(this);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeBairroValidade.call(this);
        return (_formValid == 0);
    }

    var _txtNomeBairroValidade = function () {
        if (_txtNomeBairro.value.length > 0) {
            return _toggleValidade.call(this, _txtNomeBairro, true, "");
        } else {
            return _toggleValidade.call(this, _txtNomeBairro, false, "Erro na Descricao!!!");
        }
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtNomeBairro, true, "");

        $("#divAlertaBairro").hide();
        _formValid = 0;
    }

    var _toggleValidade = function (input, valid, message) {
        var _div = $(input).parent();
        if (valid) {
            $(_div).removeClass("form-group has-error has-feedback");
            $(_div).find("span").hide();
            return 0;
        } else {
            $(_div).addClass("form-group has-error has-feedback");
            $(_div).find("span").show();
            $(_div).find("span")[1].innerHTML = message;
            return 1;
        }
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodBairro === id) {
                _confirmDeleteBairro.setMessage(_datasource[i].NomeBairro);
            }
        }
        _confirmDeleteBairro.show();
        _resetValidation.call(this);
    }
    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;
        _load();
        _confirmDeleteBairro.hide();
        _resetValidation.call(this);
    }


    var _save = function () {
        if (_validate.call(this)) {
            var _item = {
                CodBairro: _idEdit,
                NomeBairro: _txtNomeBairro.value,
                CodCidade: _idCidade
            };

            _sabeDB(_item);

            _txtNomeBairro.value = "";
            _idEdit = 0;
            _load();

            $("#editCollapseBairro").collapse('show');
            $("#editCollapseItemBairro").collapse('hide');
            $("#btnNewBairro").show();
        }
         else {
            $("#divAlertaBairro").show();
        }
    }

    function _load() {
        $.ajax({
            async: true,
            cache: false,
            url: "bairros",
            type: "GET",
            data: {
                cmd: "Select",
                CodCidade: _idCidade
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

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "bairro",
            type: "POST",
            data: item,
            datatype: "JSON",
            success: function (response) {
                //alert(response.success);
            },
            error: function () {
                alert('Erro ao salvar!');
            }
        });
    }

    function _deleteDB(id) {
        $.ajax({
            async: true,
            cache: false,
            url: "bairros",
            type: "GET",
            data: {
                cmd: "Delete",
                id: id
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
        save:_save,
        NewBairro: _NewBairro,
        editAt: _editAt,
        editClose: _editClose,
        confirm: _confirm,
        removeAt: _removeAt
    }
})();