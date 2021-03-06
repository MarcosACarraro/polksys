var ctrConta = (function () {
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;
    var _pagination = {};
    var _skip = 0;
    var _take = 10;
    var _indexPage = 1;
    var _toShow = true;
    var _txtDescricao;
    
    var _create = function () {
        //loginVerify();
        createFilter();
        createTable();
        createEdit();

        _confirmDeleteConta = ConfirmDelete();
        _confirmDeleteConta.create("divConfirm", "Conta");
    }

    function loginVerify() {
        var login = storageDB.read();
        if (!login) {
            window.location = "login.html";
        }
    }

    function createFilter() {
        /*filtro vai no Filter body*/
        _txtBusca = window.document.getElementById("txtSearh");
        _txtBusca.setAttribute("class", "search");
        _txtBusca.onkeyup = _onBuscar;
    }

    function createTable() {
        /*table vai na div principal*/
        var _tableContainer = window.document.getElementById("tableContainer");
        _table = window.document.createElement("table");
        _table.setAttribute("class", "table table-striped table-hover table-responsive");

        var row = _table.insertRow(0);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Conta";
        cell2.innerHTML = "Editar";
        cell3.innerHTML = "Excluir"
        _tableContainer.appendChild(_table);

        _search("");
    }

    function createEdit() {
        _txtDescricao = window.document.getElementById("txtDescricao");
        _txtDescricao.onchange = _txtDescricaoValidade;
        _txtDescricao.onkeyup = _txtDescricaoValidade;
        _txtDescricao.setAttribute("maxlength", "50");
        _resetValidation.call(this);

        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
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

            cell0.innerHTML = _datasource[i].CodConta;
            cell1.innerHTML = _datasource[i].Descricao;
            cell2.innerHTML = "<a href='#' onClick='ctrConta.editAt(" + _datasource[i].CodConta + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell3.innerHTML = "<a href='#' onClick='ctrConta.confirm(" + _datasource[i].CodConta + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

    var _onBuscar = function () {
        _skip = 0;
        _indexPage = 1;
        if (_txtBusca.value.length > 3) {
            _search(_txtBusca.value);
        } else if (_txtBusca.value.length === 0) {
            _search("");
        }
    }

    var _newItem = function () {
        _idEdit = 0;
        _txtDescricao.value = "";
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtDescricaoValidade.call(this);
        return (_formValid == 0);
    }

    var _txtDescricaoValidade = function () {
        if (_txtDescricao.value.length > 3) {
            return _toggleValidade.call(this, _txtDescricao, true, "");
        } else {
            return _toggleValidade.call(this, _txtDescricao, false, "Erro na Conta!!!");
        }
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtDescricao, true, "");

        $("#divAlertSave").hide();
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

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    var _save = function () {
        if (_validate.call(this)) {
            var _item = {
                CodConta: _idEdit,
                Descricao: _txtDescricao.value
            };

            _sabeDB(_item);

            _txtDescricao.value = "";
            _idEdit = 0;

            _skip = 0;
            _indexPage = 1;

            _search(_txtBusca.value);
            $("#gridPainel").collapse('show');
            $("#editPainel").collapse('hide');

        } else {
            $("#divAlertSave").show();
        }
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodConta === id) {
                _txtDescricao.value = _datasource[i].Descricao;
                _idEdit = id;
            }
        }
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodConta === id) {
                _confirmDeleteConta.setMessage(_datasource[i].Descricao);
            }
        }
        _confirmDeleteConta.show();
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;

        _skip = 0;
        _indexPage = 1;

        _search(_txtBusca.value);
        _confirmDeleteConta.hide();
        _resetValidation.call(this);
    }

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "/conta",
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
            url: "/contas",
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

    function _search(descricao) {
        $.ajax({
            async: true,
            cache: false,
            url: "/contas",
            type: "GET",
            data: {
                cmd: "Select",
                Descricao: descricao,
                skip: _skip,
                take: _take
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

        _searchTotalRecords(descricao, _paginacao);

    }

    function _paginacao(total) {

        var totalPages = Math.ceil(total / _take);

        _pagination = window.document.getElementById("ulConta");
        if (_pagination) _pagination.remove();


        if (totalPages > 1) {
            var limitButtons = 5;
            var lastButton = 0;
            var start = 1;

            lastButton = (totalPages < limitButtons) ? totalPages : limitButtons;

            if (_indexPage > limitButtons) {
                start = (_indexPage - limitButtons + 1);
                lastButton = (start + limitButtons - 1);
            }

            _pagination = window.document.createElement("ul");
            _pagination.setAttribute("id", "ulConta")
            _pagination.setAttribute("class", "pagination pagbottom");

            if (_indexPage > limitButtons) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrConta.SetPage(" + (_indexPage - 1) + ");return false;'>&laquo;</a>";
                _pagination.appendChild(li);
            }

            for (i = start; i <= lastButton; i++) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrConta.SetPage(" + i + ");return false;'>" + i + "</a>";

                if (i === _indexPage) {
                    li.setAttribute("class", "active");
                }
                _pagination.appendChild(li);
            }

            if (totalPages > lastButton) {
                if (_indexPage < totalPages) {
                    var li = window.document.createElement("li");
                    li.innerHTML = "<a href='#' onClick='ctrConta.SetPage(" + (_indexPage + 1) + ");return false;'>&raquo;</a>";
                    _pagination.appendChild(li);
                }
            }
            var _divPaging = window.document.getElementById("divPaging");
            _divPaging.appendChild(_pagination);
        }
    }

    function _searchTotalRecords(descricao, callback) {
        var _skip = 0;
        var _take = 0;
        $.ajax({
            async: true,
            cache: false,
            url: "/contas",
            type: "GET",
            data: {
                cmd: "Count",
                Descricao: descricao,
                skip: _skip,
                take: _take
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    var result = JSON.parse(data);
                    callback(result[0].Total);
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    var _SetPage = function (index) {
        _skip = ((index - 1) * _take);
        _indexPage = index;
        _search(_txtBusca.value);
    }

    var _editClose = function () {
        _idEdit = 0;
        _txtDescricao.value = "";
        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    var _toggleFilter = function () {
        if (_toShow) {
            $("#divFilterBodyCollapse").collapse('show');
            $("#iconFilter").find('i').removeClass('glyphicon-filter').addClass('glyphicon-chevron-up');
            _toShow = false;
        }
        else {
            $("#divFilterBodyCollapse").collapse('hide');
            $("#iconFilter").find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-filter');
            _toShow = true;
        }
    }

    return {
        create: _create,
        newItem: _newItem,
        save: _save,
        editAt: _editAt,
        confirm: _confirm,
        removeAt: _removeAt,
        SetPage: _SetPage,
        editClose: _editClose,
        toggleFilter: _toggleFilter
    }
})();