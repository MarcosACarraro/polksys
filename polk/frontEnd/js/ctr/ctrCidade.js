var ctrCidade = (function () {
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

    var _txtNomeCidade = {};
    var _ddlEstado = {};

    var _create = function () {
        //loginVerify();
        createFilter();
        createTable();
        createEdit();
        createEditBairro();

        _confirmDeleteCidade = ConfirmDelete();
        _confirmDeleteCidade.create("divConfirm", "Cidade");
    }

    function createFilter() {
        /*filtro vai no Filter body*/
        _txtBusca = window.document.getElementById("txtSearh");
        _txtBusca.setAttribute("class", "search");
        _txtBusca.onkeyup = _onBuscar;
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
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Nome Cidade";
        cell2.innerHTML = "Estado";
        cell3.innerHTML = "Bairro";
        cell4.innerHTML = "Editar";
        cell5.innerHTML = "Excluir"
        _tableContainer.appendChild(_table);

        _search("");
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
            var cell3 = row.insertCell(3);
            cell3.setAttribute("width", "30px");
            cell3.setAttribute("align", "center");
            var cell4 = row.insertCell(4);
            cell4.setAttribute("width", "30px");
            cell4.setAttribute("align", "center");
            var cell5 = row.insertCell(5);
            cell5.setAttribute("width", "30px");
            cell5.setAttribute("align", "center");


            cell0.innerHTML = _datasource[i].CodCidade;
            cell1.innerHTML = _datasource[i].NomeCidade;
            cell2.innerHTML = _datasource[i].Estado;
            cell3.innerHTML = "<a href='#' onClick='ctrCidade.editBairroAt(" + _datasource[i].CodCidade + ");return false;'><span class='glyphicon glyphicon-list-alt'></span></a></div>";
            cell4.innerHTML = "<a href='#' onClick='ctrCidade.editAt(" + _datasource[i].CodCidade + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell5.innerHTML = "<a href='#' onClick='ctrCidade.confirm(" + _datasource[i].CodCidade + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

  

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
        }
    }

    function _search(descCidade) {
        $.ajax({
            async: true,
            cache: false,
            url: "/cidades",
            type: "GET",
            data: {
                cmd: "Select",
                NomeCidade: descCidade,
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

        _searchTotalRecords(descCidade, _paginacao);
    }

    function _paginacao(total) {

        var totalPages = Math.ceil(total / _take);

        _pagination = window.document.getElementById("ulPaginacao");
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
            _pagination.setAttribute("id", "ulPaginacao")
            _pagination.setAttribute("class", "pagination");

            if (_indexPage > limitButtons) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrCidade.SetPage(" + (_indexPage - 1) + ");return false;'>&laquo;</a>";
                _pagination.appendChild(li);
            }

            for (i = start; i <= lastButton; i++) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrCidade.SetPage(" + i + ");return false;'>" + i + "</a>";

                if (i === _indexPage) {
                    li.setAttribute("class", "active");
                }
                _pagination.appendChild(li);
            }

            if (totalPages > lastButton) {
                if (_indexPage < totalPages) {
                    var li = window.document.createElement("li");
                    li.innerHTML = "<a href='#' onClick='ctrCidade.SetPage(" + (_indexPage + 1) + ");return false;'>&raquo;</a>";
                    _pagination.appendChild(li);
                }
            }
            var _divPaging = window.document.getElementById("divPaging");
            _divPaging.appendChild(_pagination);

        }

    }

    var _SetPage = function (index) {
        _skip = ((index - 1) * _take);
        _indexPage = index;
        _search(_txtBusca.value);
    }


    function createEdit() {

        _txtNomeCidade = window.document.getElementById("txtNomeCidade");
        _txtNomeCidade.onchange = _txtNomeValidade;
        _txtNomeCidade.onkeyup = _txtNomeValidade;
        _txtNomeCidade.setAttribute("maxlength", "50");

        _ddlEstado = window.document.getElementById("ddlEstado");
        _ddlEstado.onchange = _ddlEstadoValidade;
        _resetValidation.call(this);

        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    function createEditBairro() {
        $("#gridPainel").collapse('show');
        $("#editBairro").collapse('hide');
    }

    var _editBairroAt = function (id) {
        var _lblCidade = window.document.getElementById("lblCidade");

        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodCidade === id) {
                _lblCidade.innerHTML = "Cidade:&nbsp;" + _datasource[i].NomeCidade + "-" + _datasource[i].Estado;
                ctrBairro.create(id);
            }
        }
        $("#gridPainel").collapse('hide');
        $("#editBairro").collapse('show');
    }

    var _editBairroClose = function () {
        $("#gridPainel").collapse('show');
        $("#editBairro").collapse('hide');
    }
    

    var _txtNomeValidade = function () {
        if (_txtNomeCidade.value.length > 0) {
            return _toggleValidade.call(this, _txtNomeCidade, true, "");
        } else {
            return _toggleValidade.call(this, _txtNomeCidade, false, "Nome da Cidade obrigatorio!!!");
        }
    }

    var _ddlEstadoValidade = function () {
        if (_ddlEstado.selectedIndex == 0) {
            return _toggleValidade.call(this, _ddlEstado, false, "Selecione um Estado!!!");
        } else {
            return _toggleValidade.call(this, _ddlEstado, true, "");
        }
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

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtNomeCidade, true, "");
        _toggleValidade.call(this, _ddlEstado, true, "")

        $("#divAlertSave").hide();
        _formValid = 0;
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

    var _newItem = function () {
        _idEdit = 0;
        _txtNomeCidade.value = "";
        _ddlEstado.selectedIndex = 26;

        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtNomeValidade.call(this);
        _formValid += _ddlEstadoValidade.call(this);
        return (_formValid == 0);
    }

    var _save = function () {
        if (_validate.call(this)) {
            var _item = {
                CodCidade: _idEdit,
                NomeCidade: _txtNomeCidade.value,
                Estado: _ddlEstado.options[_ddlEstado.selectedIndex].value

            };

            _sabeDB(_item);

            _txtNomeCidade.value = "";
            _ddlEstado.selectedIndex = 26;
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

    function _searchTotalRecords(descCidade, callback) {
        var _skip = 0;
        var _take = 0;
        $.ajax({
            async: true,
            cache: false,
            url: "/cidades",
            type: "GET",
            data: {
                cmd: "Count",
                NomeCidade: descCidade,
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


    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "/cidade",
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
            url: "/cidades",
            type: "GET",
            data: {
                cmd: "Delete",
                id: id
            },
            datatype: "JSON",
            success: function (response) {
                var result =JSON.parse(response);
                if (result.error) {
                    alert("Nao pode ser excluido (FK)");
                }
            },
            error: function () {
                alert('Erro ao Deletar!');
            }
        });
    }

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodCidade === id) {
                _txtNomeCidade.value = _datasource[i].NomeCidade;
                for (j = 0; j < _ddlEstado.length; j++) {
                    if (_ddlEstado.options[j].value === _datasource[i].Estado) {
                        _ddlEstado.selectedIndex = j;
                    }
                }
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
            if (_datasource[i].CodCidade === id) {
                _confirmDeleteCidade.setMessage(_datasource[i].NomeCidade);
            }
        }
        _confirmDeleteCidade.show();
        _resetValidation.call(this);
    }

    var _editClose = function () {
        _idEdit = 0;
        _txtNomeCidade.value = "";
        _ddlEstado.selectedIndex = 26;
        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;

        _skip = 0;
        _indexPage = 1;

        _search(_txtBusca.value);
        _confirmDeleteCidade.hide();
        _resetValidation.call(this);
    }

    return {
        create: _create,
        toggleFilter: _toggleFilter,
        newItem: _newItem,
        save: _save,
        editAt: _editAt,
        confirm: _confirm,
        editClose: _editClose,
        removeAt: _removeAt,
        SetPage: _SetPage,
        editBairroAt: _editBairroAt,
        editBairroClose:_editBairroClose
    }
})();