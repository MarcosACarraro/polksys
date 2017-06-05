var ctrContaLancamentoBaixa = (function () {
    var _idCodLancamento = 0;
    var _formValid = 0;
    var _txtDataPagamento = {};
    var _txtValorPagamento = {};

    var _create = function (id) {
        createEdit(id);
        _resetValidation.call(this);
    }

    function createEdit(id) {

        _idCodLancamento = id;
        _txtDataPagamento = window.document.getElementById("txtDataPagamento");
        _txtDataPagamento.setAttribute("maxlength", "10");
        _txtDataPagamento.onchange = _txtDataPagamentoValidade;

        _txtValorPagamento = window.document.getElementById("txtValorPagamento");
        _txtValorPagamento.onchange = _txtValorPagamentoValidade;
        _txtValorPagamento.onkeyup = _txtValorPagamentoValidade;

        $(_txtDataPagamento).daterangepicker({
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
            _txtDataPagamento.value = _formatDate(start);
            _txtDataPagamentoValidade.call(this);
        });
    }

    var _txtDataPagamentoValidade = function () {
        if (_txtDataPagamento.value.length > 0) {
            var regEx = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/;
            if (regEx.test(_txtDataPagamento.value)) {
                return _toggleValidade.call(this, _txtDataPagamento, true, "");
            } else {
                return _toggleValidade.call(this, _txtDataPagamento, false, "Data Invalida!!!");
            }
        } else {
            return _toggleValidade.call(this, _txtDataPagamento, false, "Data Pagamento Obrigatoria");
        }
    }

    var _txtValorPagamentoValidade = function () {
        if (_txtValorPagamento.value.length > 0) {
            return _toggleValidade.call(this, _txtValorPagamento, true, "");
        } else {
            return _toggleValidade.call(this, _txtValorPagamento, false, "Valor obrigatorio!!!");
        }
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtDataPagamentoValidade.call(this);
        _formValid += _txtValorPagamentoValidade.call(this);
        return (_formValid == 0);
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtDataPagamento, true, "");
        _toggleValidade.call(this, _txtValorPagamento, true, "");
        $("#divContaBaixaAlertSave").hide();
        _formValid = 0;
    }

    var _toggleValidade = function (input, valid, message) {
        var _div = $(input).parent();
        if (valid) {
            $(_div).removeClass("form-group has-error has-feedback");
            $(_div).find("span").hide();
            $("#divContaBaixaAlertSave").hide();
            return 0;
        } else {
            $(_div).addClass("form-group has-error has-feedback");
            $(_div).find("span").show();
            $(_div).find("span")[1].innerHTML = message;
            return 1;
        }
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

    function _SetDateTime(strDateTime) {
        var dateTime = null;
        if (strDateTime.length > 0) {
            dateTime = new Date(parseInt(strDateTime.substring(6, 10)), parseInt(strDateTime.substring(3, 5)) - 1, parseInt(strDateTime.substring(0, 2)));
        }
        return dateTime;
    }

    var _confirmar = function () {
        if (_validate.call(this)) {

            var dtDataPagamento = _SetDateTime(_txtDataPagamento.value);

            var _item = {
                CodContaBaixa: 0,
                CodContaLancamento: _idCodLancamento,
                Descricao: "Baixa",
                DataPagamento: dtDataPagamento,
                Valor: _txtValorPagamento.value,
                ValorTotal: 22,
                Situacao: "F"
            };

            _sabeDB(_item);
            _clearEditFields();

           ctrContaLancamento.search("");
            
            $("#gridPainel").collapse('show');
            $("#divContaBaixa").collapse('hide');

        } else {
            $("#divContaBaixaAlertSave").show();
        }
    }

    function _sabeDB(item) {
        $.ajax({
            async: true,
            cache: false,
            url: "/contaBaixa",
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

    function _clearEditFields() {
        _idCodLancamento = 0;
        _txtDataPagamento.value = "";
        _txtValorPagamento.value = "";
    }
   
    return {
        create: _create,
        confirmar: _confirmar
    }
})();