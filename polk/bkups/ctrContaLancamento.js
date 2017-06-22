var ctrContaLancamento = (function () {
    var _id = 0;
    var _idEdit = 0;
    var _idExcluir = 0;
    var _datasource = [];
    var _table = {};
    var _formValid = 0;
    var _pagination = {};
    var _skip = 0;
    var _take = 20;
    var _indexPage = 1;
    var _toShow = true;

    var _txtEndereco = {};
    var _txtDataEmissao = {};
    var _txtDataVencimento = {};
    var _txtValor = {};

    var _create = function () {
        createFilter();
        createTable();
        createEdit();
        _confirmContaLancamento = ConfirmDelete();
        _confirmContaLancamento.create("divConfirm", "ContaLancamento");
    }
    
    function createEdit() {

        _txtDescricao = window.document.getElementById("txtDescricao");
        _txtDescricao.onchange = _txtDescricaoValidade;
        _txtDescricao.onkeyup = _txtDescricaoValidade;

        _txtValor = window.document.getElementById("txtValor");
        _txtValor.onchange = _txtValorValidade;
        _txtValor.onkeyup = _txtValorValidade;

        $(_txtValor).inputmask('decimal', {
            'alias': 'numeric',
            'groupSeparator': '.',
            'autoGroup': true,
            'digits': 2,
            'radixPoint': ",",
            'digitsOptional': false,
            'allowMinus': false,
            'prefix': 'R$ ',
            'placeholder': '',
            'autoUnmask': true
        });

        _txtDataEmissao = window.document.getElementById("txtDataEmissao");
        _txtDataEmissao.setAttribute("maxlength", "10");
        _txtDataEmissao.onchange = _txtDataEmissaoValidade;

        $(_txtDataEmissao).daterangepicker({
            singleDatePicker: true,
            singleClasses: "picker_4",
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "OK",
                cancelLabel: "Cancelar",
                fromLabel: "De",
                toLabel: "Ate",
                customRangeLabel: "Custom",
                weekLabel: "S",
                daysOfWeek: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab"
                ],
                monthNames: [
                    "Janeiro",
                    "Fevereiro",
                    "Marco",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Augosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ],
                firstDay: 1
            },
            linkedCalendars: false,
            autoUpdateInput: false,
            showCustomRangeLabel: false,
            startDate: "01/01/2017",
            endDate: "10/10/2017"
        }, function (start, end, label) {
            _txtDataEmissao.value = _formatDate(start);
            //console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
        });


        _txtDataVencimento = window.document.getElementById("txtDataVencimento");
        _txtDataVencimento.setAttribute("maxlength", "10");
        _txtDataVencimento.onchange = _txtDataVencimentoValidade;

        $(_txtDataVencimento).daterangepicker({
            singleDatePicker: true,
            singleClasses: "picker_4",
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "OK",
                cancelLabel: "Cancelar",
                fromLabel: "De",
                toLabel: "Ate",
                customRangeLabel: "Custom",
                weekLabel: "S",
                daysOfWeek: [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sab"
                ],
                monthNames: [
                    "Janeiro",
                    "Fevereiro",
                    "Marco",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Augosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ],
                firstDay: 1
            },
            linkedCalendars: false,
            autoUpdateInput: false,
            showCustomRangeLabel: false,
            startDate: "01/01/2017",
            endDate: "10/10/2017"
        }, function (start, end, label) {
            _txtDataVencimento.value = _formatDate(start);
            //console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
        });

        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
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
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Descricao";
        cell2.innerHTML = "Emissao";
        cell3.innerHTML = "Vencimento";
        cell4.innerHTML = "Valor";
        cell5.innerHTML = "Baixar";
        cell6.innerHTML = "Editar";
        cell7.innerHTML = "Excluir";
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
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);

            var cell5 = row.insertCell(5);
            cell5.setAttribute("width", "30px");
            cell5.setAttribute("align", "center");

            var cell6 = row.insertCell(6);
            cell6.setAttribute("width", "30px");
            cell6.setAttribute("align", "center");

            var cell7 = row.insertCell(7);
            cell7.setAttribute("width", "30px");
            cell7.setAttribute("align", "center");

            cell0.innerHTML = _datasource[i].CodContaLancamento;
            cell1.innerHTML = _datasource[i].Descricao;
            cell2.innerHTML = _formatDate(_datasource[i].DataEmissao);
            cell3.innerHTML = _formatDate(_datasource[i].DataVencimento);
            cell4.innerHTML = FormatRS(_datasource[i].Valor);
            cell5.innerHTML = "<a href='#' onClick='ctrContaLancamento.baixarEdit(" + _datasource[i].CodContaLancamento + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell6.innerHTML = "<a href='#' onClick='ctrContaLancamento.editAt(" + _datasource[i].CodContaLancamento + ");return false;'><span class='glyphicon glyphicon-edit'></span></a></div>";
            cell7.innerHTML = "<a href='#' onClick='ctrContaLancamento.confirm(" + _datasource[i].CodContaLancamento + ");return false;'><span class='glyphicon glyphicon-trash'></span></a></div>";
        }
    }

    
    function FormatRS(value) {
        var strNumber = value.toString();
        strNumber = strNumber.replace(/[^0-9\.,]/g, "");
        if (strNumber == "") strNumber = "0";
        strNumber = strNumber.replace(',', '.')
        v = parseFloat(strNumber);

        v = v.toFixed(2) + '';
        x = v.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return "R$ " +x1.replace(',', '.') + x2.replace('.', ',');
    }


    var _baixarEdit = function (id) {

        var valor = 0;

        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodContaLancamento == id) {
                $("#lblDocumento").text(_datasource[i].Descricao);
                $("#lblDataEmissao").text(_formatDate(_datasource[i].DataEmissao));
                $("#lblVencimento").text(_formatDate(_datasource[i].DataVencimento));
                $("#lblValorPagar").text(FormatRS(_datasource[i].Valor));
                $("#lblValorTotalPagar").text(FormatRS(_datasource[i].Valor));
                valor = _datasource[i].Valor
            }
        }

        ctrContaLancamentoBaixa.create(id,valor);
        $("#gridPainel").collapse('hide');
        $("#divContaBaixa").collapse('show');
    }

    var _baixarClose = function () {
        $("#gridPainel").collapse('show');
        $("#divContaBaixa").collapse('hide');
    }

    var _txtDataEmissaoValidade = function () {
        if (_txtDataEmissao.value.length > 0) {
            var regEx = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
            if (regEx.test(_txtDataEmissao.value)) {
                return _toggleValidade.call(this, _txtDataEmissao, true, "");
            } else {
                return _toggleValidade.call(this, _txtDataEmissao, false, "Data Invalida!!!");
            }
        } else {
            return _toggleValidade.call(this, _txtDataEmissao, true, "");
        }
    }

    var _txtDataVencimentoValidade = function () {
        if (_txtDataEmissao.value.length > 0) {
            var regEx = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
            if (regEx.test(_txtDataVencimento.value)) {
                return _toggleValidade.call(this, _txtDataVencimento, true, "");
            } else {
                return _toggleValidade.call(this, _txtDataVencimento, false, "Data Invalida!!!");
            }
        } else {
            return _toggleValidade.call(this, _txtDataVencimento, true, "");
        }
    }

    function _SetDateTime(strDateTime) {
        var dateTime = null;
        if (strDateTime.length > 0) {
            dateTime = new Date(parseInt(strDateTime.substring(6, 10)), parseInt(strDateTime.substring(3, 5)) - 1, parseInt(strDateTime.substring(0, 2)));
        }
        return dateTime;
    }

    function _formatDate(dateTime) {
        var dateString = "";
        if (dateTime) {
            var d = new Date(dateTime);
            var mes = (d.getMonth() + 1);
            var dia = d.getDate();
            var strDia = (dia.toString().length === 1) ? "0" + dia.toString() : dia.toString();
            var strMes = (mes.toString().length === 1) ? "0" + mes.toString() : mes.toString();
            dateString = strDia + "/" + strMes + "/" + d.getFullYear();
        }
        return dateString;
    }

    var _txtDescricaoValidade = function () {
        if (_txtDescricao.value.length > 0) {
            return _toggleValidade.call(this, _txtDescricao, true, "");
        } else {
            return _toggleValidade.call(this, _txtDescricao, false, "Descricao obrigatoria!!!");
        }
    }

    var _txtValorValidade = function () {
        if (_txtValor.value.length > 0) {
            return _toggleValidade.call(this, _txtValor, true, "");
        } else {
            return _toggleValidade.call(this, _txtValor, false, "Valor obrigatorio!!!");
        }
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtDescricaoValidade.call(this);
        _formValid += _txtDataEmissaoValidade.call(this);
        _formValid += _txtDataVencimentoValidade.call(this);
        _formValid += _txtValorValidade.call(this);
        return (_formValid == 0);
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtDescricao, true, "");
        _toggleValidade.call(this, _txtDataEmissao, true, "");
        _toggleValidade.call(this, _txtDataVencimento, true, "");
        _toggleValidade.call(this, _txtValor, true, "");
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

    var _editAt = function (id) {
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodContaLancamento === id) {
                _txtDescricao.value = _datasource[i].Descricao;
                _txtDataEmissao.value = _formatDate(_datasource[i].DataEmissao);
                _txtDataVencimento.value = _formatDate(_datasource[i].DataVencimento);
                _txtValor.value = _datasource[i].Valor;
                _idEdit = id;
            }
        }
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    var _editClose = function () {
        _clearEditFields();
        $("#gridPainel").collapse('show');
        $("#editPainel").collapse('hide');
    }

    var _save = function () {
        if (_validate.call(this)) {
       
            var dtDataEmissao = _SetDateTime(_txtDataEmissao.value);
            var dtDataVencimento = _SetDateTime(_txtDataVencimento.value);
            var valor = parseFloat(_txtValor.value.replace(",", "."));

            var _item = {
                CodContaLancamento: _idEdit,
                Descricao: _txtDescricao.value,
                DataEmissao: dtDataEmissao,
                DataVencimento: dtDataVencimento,
                Valor: valor
            };

            _sabeDB(_item);
            _clearEditFields();

            _skip = 0;
            _indexPage = 1;

            _search(_txtBusca.value);
            $("#gridPainel").collapse('show');
            $("#editPainel").collapse('hide');

        } else {
            $("#divAlertSave").show();
        }
    }

    var _confirm = function (id) {
        _idExcluir = id;
        for (var i = 0; i < _datasource.length; i++) {
            if (_datasource[i].CodContaLancamento === id) {
                _confirmContaLancamento.setMessage(_datasource[i].Descricao);
            }
        }
        _confirmContaLancamento.show();
        _resetValidation.call(this);
    }

    var _removeAt = function () {
        _deleteDB(_idExcluir);
        _idExcluir = 0;

        _skip = 0;
        _indexPage = 1;

        _search(_txtBusca.value);
        _confirmContaLancamento.hide();
        _resetValidation.call(this);
    }

    function _clearEditFields() {
        _idEdit = 0;
        _txtDescricao.value = "";
        _txtDataEmissao.value = "";
        _txtDataVencimento.value = "";
        _txtValor.value = "";
    }

    var _newItem = function () {
        _clearEditFields();
        $("#gridPainel").collapse('hide');
        $("#editPainel").collapse('show');
        _resetValidation.call(this);
    }

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "/contaLancamento",
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
            url: "/contasLancamentos",
            type: "GET",
            data: {
                cmd: "Delete",
                id: id
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    var result = JSON.parse(data);
                    if (result.error == "error") {
                        alert("Nao foi possivel Exluir!!");
                    }
                }
            },
            error: function () {
                alert('Erro ao Deletar!');
            }
        });
    }

    function createFilter() {
        /*filtro vai no Filter body*/
        _txtBusca = window.document.getElementById("txtSearh");
        _txtBusca.setAttribute("type", "text");
        _txtBusca.setAttribute("class", "search");
        _txtBusca.onkeyup = _onBuscar;
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
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

    function _search(descricao) {
        $.ajax({
            async: true,
            cache: false,
            url: "/contasLancamentos",
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

    function _searchTotalRecords(descricao, callback) {
        var _skip = 0;
        var _take = 0;
        $.ajax({
            async: true,
            cache: false,
            url: "contasLancamentos",
            type: "GET",
            data: {
                cmd: "Count",
                Descricao: descricao
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
                li.innerHTML = "<a href='#' onClick='ctrContaLancamento.SetPage(" + (_indexPage - 1) + ");return false;'>&laquo;</a>";
                _pagination.appendChild(li);
            }

            for (i = start; i <= lastButton; i++) {
                var li = window.document.createElement("li");
                li.innerHTML = "<a href='#' onClick='ctrContaLancamento.SetPage(" + i + ");return false;'>" + i + "</a>";

                if (i === _indexPage) {
                    li.setAttribute("class", "active");
                }
                _pagination.appendChild(li);
            }

            if (totalPages > lastButton) {
                if (_indexPage < totalPages) {
                    var li = window.document.createElement("li");
                    li.innerHTML = "<a href='#' onClick='ctrContaLancamento.SetPage(" + (_indexPage + 1) + ");return false;'>&raquo;</a>";
                    _pagination.appendChild(li);
                }
            }

            var _divPaging = window.document.getElementById("divPaging");
            _divPaging.appendChild(_pagination);
        }

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
        toggleFilter: _toggleFilter,
        editAt: _editAt,
        baixarEdit: _baixarEdit,
        baixarClose: _baixarClose,
        editClose: _editClose,
        save: _save,
        confirm: _confirm,
        removeAt: _removeAt,
        newItem: _newItem,
        SetPage: _SetPage,
        search:_search
    }
})();