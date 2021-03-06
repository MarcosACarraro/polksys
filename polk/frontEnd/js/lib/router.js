var router = (function () {

    var _getRoute = function (param) {
        loginVerify();

        var route = getParameterByName(param);
        switch (route) {
            case "profissao":profissao();
                break;
            case "cliente": cliente();
                break;
            case "cidade": cidade();
                break;
            case "profissional": profissional();
                break;
            case "grupoAcesso": grupoAcesso();
                break;
            case "contaPagar": contaPagar();
                break;
            case "contaReceber": contaReceber();
                break;
            case "contaBaixa": contaBaixa();
                break;
            case "extrato": extrato();
                break;
            case "conta": conta();
                break;
            case "contaContabil": contaContabil();
                break;
            default:
                text = "";
        }
    }

    function loginVerify() {
        storageDB.loginVerify(function (_login) {
            if (_login.login === "error") {
                window.location = "Login.html";
            } else {
                $("#mainLogin").text(_login.Nome);
            }
        });
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1]);
    }

    function profissao() {
        $("#editContent").load("view/Profissao.html", function () {
            ctrProfissao.create();
        });
    }
    function cliente() {
        $("#editContent").load("view/Cliente.html", function () {
            ctrCliente.create();
        });
    }
    function cidade() {
        $("#editContent").load("view/Cidade.html", function () {
            ctrCidade.create();
        });
    }
    function profissional() {
        $("#editContent").load("view/Profissional.html", function () {
            ctrProfissional.create();
        });
    }
    function grupoAcesso() {
        $("#editContent").load("view/GrupoAcesso.html", function () {
            ctrGrupoAcesso.create();
        });
    }

    function contaPagar() {
        $("#editContent").load("view/ContaPagar.html", function () {
            ctrContaPagar.create();
        });
    }
    function contaReceber() {
        $("#editContent").load("view/ContaReceber.html", function () {
            ctrContaReceber.create();
        });
    }
    function contaBaixa() {
        $("#editContent").load("view/ContaBaixa.html", function () {
            ctrContaBaixa.create();
        });
    }
    function extrato() {
        $("#editContent").load("view/Extrato.html", function () {
            ctrExtrato.create();
        });
    }
    function conta() {
        $("#editContent").load("view/Conta.html", function () {
            ctrConta.create();
        });
    }
    function contaContabil() {
        $("#editContent").load("view/ContaContabil.html", function () {
            ctrContaContabil.create();
        });
    }

    return {
        getRoute: _getRoute
    }
})();