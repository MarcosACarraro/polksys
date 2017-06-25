var ctrExtrato = (function () {
    var _table = {};
    var _datasource = {};
    var _saldos = {};
    var _periodos = {};
    //var _dtConsulta = _SetDateTime("15/09/2017");
    var _dtConsulta = new Date();

    var _create = function () {
        
        createTable();
        LoadAll();
    }

    function LoadAll() {
        _LoadPeriodos();
        _LoadSaldos();
        _Load();
    }

    function CreatePeriodos() {

        var _divPeriodos = window.document.getElementById("divPeriodos");

        _periodosNav = window.document.getElementById("periodosNav");
        if (_periodosNav) _periodosNav.remove();

        _periodosNav = window.document.createElement("ul");
        _periodosNav.setAttribute("id", "periodosNav")
        _periodosNav.setAttribute("class", "nav nav-pills nav-justified");

        for (var i = 0; i < _periodos.length; i++) {
            var li = window.document.createElement("li");
            li.innerHTML = "<a href='#' onClick='ctrExtrato.SetActive(" + _periodos[i].Mes + ");return false;'>" + getMonth(_periodos[i].Mes) + "-" + _periodos[i].Ano + "</a>";

            if (_periodos[i].Mes === (_dtConsulta.getMonth() + 1)) {
                 li.setAttribute("class", "active");
            }
             
            _periodosNav.appendChild(li);
        }

        _divPeriodos.appendChild(_periodosNav);

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
        cell0.innerHTML = "codigo";
        cell1.innerHTML = "Descricao";
        cell2.innerHTML = "Data";
        cell3.innerHTML = "Valor";
        cell4.innerHTML = "DC";
        _tableContainer.appendChild(_table);
    }

    function createSaldoAnterior() {
        var rowcab = _table.insertRow(1);
        rowcab.setAttribute("class", "saldos");

        var cell0 = rowcab.insertCell(0);
        cell0.setAttribute("width", "30px");

        var cell1 = rowcab.insertCell(1);
        var cell2 = rowcab.insertCell(2);
        var cell3 = rowcab.insertCell(3);
        var cell4 = rowcab.insertCell(4);

        cell0.innerHTML = "";
        cell1.innerHTML = "Saldo Anterior";
        cell2.innerHTML = _formatDate(_saldos[0].DataSaldoAnterior);
        cell3.innerHTML = FormatRS(_saldos[0].SaldoAnterior);
        cell4.innerHTML = "";
    }


    function createSaldoAtual(linha) {
        var rowcab = _table.insertRow(linha);
        rowcab.setAttribute("class", "saldos");

        var cell0 = rowcab.insertCell(0);
        cell0.setAttribute("width", "30px");

        var cell1 = rowcab.insertCell(1);
        var cell2 = rowcab.insertCell(2);
        var cell3 = rowcab.insertCell(3);
        var cell4 = rowcab.insertCell(4);

        cell0.innerHTML = "";
        cell1.innerHTML = "Saldo Atual";
        cell2.innerHTML = _formatDate(_saldos[0].DataSaldoConsulta);
        cell3.innerHTML = FormatRS(_saldos[0].SaldoAtual);
        cell4.innerHTML = ""
    }

    var _tableDataBind = function () {
        _limpar.call(this);

        createSaldoAnterior();

        var linha = 1;

        for (var i = 0; i < _datasource.length; i++) {
            linha++;
            var row = _table.insertRow(linha);

            if (_datasource[i].Lancamento === "D") {
                row.setAttribute("class", "debito");
            }

            var cell0 = row.insertCell(0);
            cell0.setAttribute("width", "30px");

            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);

            cell0.innerHTML = _datasource[i].CodContaBaixa;
            cell1.innerHTML = _datasource[i].Descricao;
            cell2.innerHTML = _formatDate(_datasource[i].DataPagamento);
            cell3.innerHTML = FormatRS(_datasource[i].ValorTotal);
            cell4.innerHTML = _datasource[i].Lancamento;
        }
        linha++;
        createSaldoAtual(linha);
    }

    function getMonth(month){
        var strMonth =0;
        switch(month) {
            case 1:
                strMonth="Janeiro";
                break;
            case 2:
                strMonth="Fevereiro";
                break;
            case 3:
                strMonth = "Marco";
                break;
            case 4:
                strMonth = "Abril";
                break;
            case 5:
                strMonth = "Maio";
                break;
            case 6:
                strMonth = "Junho";
                break;
            case 7:
                strMonth = "Julho";
                break;
            case 8:
                strMonth = "Agosto";
                break;
            case 9:
                strMonth = "Setembro";
                break;
            case 10:
                strMonth = "Outubro";
                break;
            case 11:
                strMonth = "Novembro";
                break;
            case 12:
                strMonth = "Dezembro";
                break;
            default:
                strMonth = "Indefinido";
        }

        return strMonth;
    }

    function _SetDateTime(strDateTime) {
        var dateTime = null;
        if (strDateTime.length > 0) {
            dateTime = new Date(parseInt(strDateTime.substring(6, 10)), parseInt(strDateTime.substring(3, 5)) - 1, parseInt(strDateTime.substring(0, 2)));
        }
        return dateTime;
    }

    function _Load() {
        $.ajax({
            async: true,
            cache: false,
            url: "/contaExtrato",
            type: "GET",
            data: {
                cmd: "Select",
                dataConsulta: _dtConsulta
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

    function _LoadSaldos() {
        $.ajax({
            async: true,
            cache: false,
            url: "/contaSaldos",
            type: "GET",
            data: {
                cmd: "Select",
                dataConsulta: _dtConsulta
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    _saldos = JSON.parse(data);
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    function _LoadPeriodos() {
        $.ajax({
            async: true,
            cache: false,
            url: "/periodos",
            type: "GET",
            data: {
                cmd: "Select",
            },
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    _periodos = JSON.parse(data);
                    CreatePeriodos();
                }
            },
            error: function () {
                alert('Erro carregar registros!');
            }
        });
    }

    var _limpar = function () {
        var tableHeaderRowCount = 1;
        var rowCount = _table.rows.length;
        for (var i = tableHeaderRowCount; i < rowCount; i++) {
            _table.deleteRow(tableHeaderRowCount);
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

        return "R$ " + x1.replace(',', '.') + x2.replace('.', ',');
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

    var _SetActive = function (active) {
        if (_dtConsulta) {
            var dd = _dtConsulta.getDate();
            var mm = (active - 1); //January is 0!
            var yyyy = _dtConsulta.getFullYear();

            _dtConsulta = new Date(yyyy, mm, dd);
            LoadAll();
        }
     
    }
    

    return {
        create: _create,
        SetActive: _SetActive
    }
})();