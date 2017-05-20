var ctrLogin = (function () {
    var _txtUsuario = {};
    var _txtSenha = {};

    var _create = function () {
        createEdit();
    }


    function createEdit() {
        _txtUsuario = window.document.getElementById("txtUsuario");
        _txtUsuario.onchange = _txtUsuarioValidade;
        _txtUsuario.onkeyup = _txtUsuarioValidade;

        _txtSenha = window.document.getElementById("txtSenha");
        _txtSenha.onchange = _txtSenhaValidade;
        _txtSenha.onkeyup = _txtSenhaValidade;

        _resetValidation.call(this);
    }

    var _txtUsuarioValidade = function () {
        if (_txtUsuario.value.length > 0) {
            return _toggleValidade.call(this, _txtUsuario, true, "");
        } else {
            return _toggleValidade.call(this, _txtUsuario, false, "Erro no Login!!!");
        }
    }
    var _txtSenhaValidade = function () {
        if (_txtSenha.value.length > 0) {
            return _toggleValidade.call(this, _txtSenha, true, "");
        } else {
            return _toggleValidade.call(this, _txtSenha, false, "Erro no Login!!!");
        }
    }

    var _resetValidation = function () {
        _toggleValidade.call(this, _txtUsuario, true, "");

        $("#divAlertSave").hide();
        $("#divAlertInvalido").hide();
        _formValid = 0;
    }

    var _toggleValidade = function (input, valid, message) {
        var _div = $(input).parent();
        if (valid) {
            $(_div).removeClass("form-group has-error has-feedback");
            return 0;
        } else {
            $(_div).addClass("form-group has-error has-feedback");
            return 1;
        }
    }

    var _validate = function () {
        _formValid = 0;
        _formValid += _txtUsuarioValidade.call(this);
        _formValid += _txtSenhaValidade.call(this);
        return (_formValid == 0);
    }

    var _logar = function () {
        _resetValidation.call(this);
        if (_validate.call(this)) {
            var _usuario = {
                cmd:"Logar",
                Login: _txtUsuario.value,
                Senha: _txtSenha.value
            };

            _logarDB(_usuario, function (data) {
                if (data === "error") {
                    $("#divAlertInvalido").show();
                    storageDB.insert("");
                } else {
                    storageDB.insert(data);
                    window.location = "Index.html";
                }
            });

        } else {
            $("#divAlertSave").show();
        }
    }

    function _logarDB(item,callback) {
        $.ajax({
            async: true,
            cache: false,
            url: "/profissionais",
            type: "GET",
            data: item,
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    callback(data);
                }
            },
            error: function () {
                alert('Erro ao Deletar!');
            }
        });
    }

    function _testar() {
        storageDB.loginVerify(function (login) {
            alert(login);
            //window.location = "Login.html";
        });

        //var token = storageDB.read();
        //alert(token);
    }


    return {
        logar:_logar,
        create: _create,
        testar: _testar
    }

})();