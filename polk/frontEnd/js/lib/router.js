var router = (function () {

    var _getRoute = function (param) {
        var route = getParameterByName(param);
        switch (route) {
            case "profissao":profissao();
                break;
            case "cliente": cliente();
                break;
            default:
                text = "I have never heard of that fruit...";
        }
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1]);
    }

    function profissao() {
        $("#editContent").load("Profissao.html", function () {
            ctrProfissao.create();
        });
    }
    function cliente() {
        $("#editContent").load("view/Cliente.html", function () {
            ctrCliente.create();
        });
    }
   

    return {
        getRoute: _getRoute
    }
})();