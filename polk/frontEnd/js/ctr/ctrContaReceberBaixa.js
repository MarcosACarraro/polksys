var ctrContaReceberBaixa = (function () {
    var _idCodLancamento = 0;
    var _formValid = 0;
    var _txtDataPagamento = {};
    var _txtDesconto = {};
    var _txtJuros = {};
    var _txtMulta = {};
    var _valor = 0;
    var _valorTotal = 0;
    var _desconto = 0;
    var _juros = 0;
    var _multa = 0;

    var _create = function (id,valor) {
        createEdit(id, valor);
        _resetValidation.call(this);
    }

    function createEdit(id,valor) {
        _valor = valor
        _valorTotal = valor

        _idCodLancamento = id;
        _txtDataPagamento = window.document.getElementById("txtDataPagamento");
        _txtDataPagamento.setAttribute("maxlength", "10");
        _txtDataPagamento.onchange = _txtDataPagamentoValidade;

        _txtDesconto = window.document.getElementById("txtDesconto");
        _txtDesconto.value = "0";
        _txtDesconto.onchange = _txtDescontoValidade;
        _txtDesconto.onkeyup = _txtDescontoValidade;

        $(_txtDesconto).inputmask('decimal', {
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

        _txtJuros = window.document.getElementById("txtJuros");
        _txtJuros.value = "0";
        _txtJuros.onchange = _txtJurosValidade;
        _txtJuros.onkeyup = _txtJurosValidade;

        $(_txtJuros).inputmask('decimal', {
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

        _txtMulta = window.document.getElementById("txtMulta");
        _txtMulta.value = "0";
        _txtMulta.onchange = _txtMultaValidade;
        _txtMulta.onkeyup = _txtMultaValidade;

        $(_txtMulta).inputmask('decimal', {
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

    var _txtDescontoValidade = function () {
        if (_txtDesconto.value) {
            ValorTotalPagar();
            return _toggleValidade.call(this, _txtDesconto, true, "");
        } else {
            return _toggleValidade.call(this, _txtDesconto, false, "Valor obrigatorio!!!");
        }
    }
    var _txtJurosValidade = function () {
        if (_txtJuros.value) {
            ValorTotalPagar();
            return _toggleValidade.call(this, _txtJuros, true, "");
        } else {
            return _toggleValidade.call(this, _txtJuros, false, "Valor obrigatorio!!!");
        }
    }
    var _txtMultaValidade = function () {
        if (_txtMulta.value) {
            ValorTotalPagar();
            return _toggleValidade.call(this, _txtMulta, true, "");
        } else {
            return _toggleValidade.call(this, _txtMulta, false, "Valor obrigatorio!!!");
        }
    }
  
    function ValorTotalPagar() {
        _desconto = parseFloat(_txtDesconto.value.replace(",", "."));
        _juros = parseFloat(_txtJuros.value.replace(",", "."));
        _multa = parseFloat(_txtMulta.value.replace(",", "."));

        _valorTotal = _valor - _desconto + _juros + _multa;

        $("#lblValorTotalPagar").text(FormatRS(_valorTotal));
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

        return "R$ " + x1.replace(',', '.') + x2.replace('.', ',');
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtDataPagamentoValidade.call(this);
        _formValid += _txtDescontoValidade.call(this);
        _formValid += _txtJurosValidade.call(this);
        _formValid += _txtMultaValidade.call(this);
        return (_formValid == 0);
    }

 

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtDataPagamento, true, "");
        _toggleValidade.call(this, _txtDesconto, true, "");
        _toggleValidade.call(this, _txtJuros, true, "");
        _toggleValidade.call(this, _txtMulta, true, "");
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

            ValorTotalPagar();
            var dtDataPagamento = _SetDateTime(_txtDataPagamento.value);
            
            var _item = {
                CodContaBaixa: 0,
                CodContaLancamento: _idCodLancamento,
                Descricao: $("#lblDocumento").text(),
                DataPagamento: dtDataPagamento,
                Desconto: _desconto,
                Juros: _juros,
                Multa: _multa,
                Valor: _valor,
                ValorTotal: _valorTotal,
                Situacao: "F",
                Lancamento: "C",
                CodConta: 1
            };

            _sabeDB(_item);
            _clearEditFields();

           ctrContaReceber.search("");
            
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
        _txtDesconto.value = "";
        _txtJuros.value = "";
        _txtMulta.value = "";
    }
   
    return {
        create: _create,
        confirmar: _confirmar
    }
})();