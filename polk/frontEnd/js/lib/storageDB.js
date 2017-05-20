var storageDB = (function () {

    var _insert = function (strToken) {
        localStorage.setItem("token", strToken);
    }

    var _read = function (strUsuario, strToken) {
        var token = localStorage.getItem("token");
        return token;
    }

    function _loginVerify(callback) {
        var _item = {
            token:  localStorage.getItem("token")
        };

        $.ajax({
            async: true,
            cache: false,
            url: "/loginVerify",
            type: "GET",
            data: _item,
            datatype: "JSON",
            success: function (data, success) {
                if (success = "success") {
                    result = JSON.parse(data);
                    if (result.login) {
                        callback(result)
                    }
                } 
            },
            error: function () {
                alert('Erro ao Deletar!');
            }
        });
    }

    return {
        insert: _insert,
        read: _read,
        loginVerify: _loginVerify
    }

})();