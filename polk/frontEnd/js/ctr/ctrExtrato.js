var ctrExtrato = (function () {
    var _table = {};

    var _datasource = [
        { CodContaBaixa: 1, Descricao: "desc", DataPagamento: "2017-01-01", ValorTotal: 100, Lancamento: "C" },
        { CodContaBaixa: 2, Descricao: "desc", DataPagamento: "2017-01-01", ValorTotal: 200, Lancamento: "D" },
        { CodContaBaixa: 3, Descricao: "desc", DataPagamento: "2017-01-01", ValorTotal: 300, Lancamento: "C" }
    ];

    var _create = function () {
        createTable();
        _Load();
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

    //function createSaldoAnterior() {
    //    var row = _table.insertRow(0);
    //    var cell0 = row.insertCell(0);
    //    cell0.colSpan = 5;
    //    cell0.innerHTML = "ola mundo";
    //}


    //function createSaldoAtual() {
    //    var row = _table.insertRow(0);
    //    var cell0 = row.insertCell(0);
    //    cell0.colSpan = 5;
    //    cell0.innerHTML = "ola mundo";
    //}

    var _tableDataBind = function () {
        _limpar.call(this);

        var linha = 1;

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
        cell2.innerHTML = ""
        cell3.innerHTML = FormatRS(100);
        cell4.innerHTML = "";

        
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
        cell2.innerHTML = ""
        cell3.innerHTML = FormatRS(100);
        cell4.innerHTML = ""
    }

    function _Load() {
        _tableDataBind.call(this);
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

    return {
        create: _create
    }
})();