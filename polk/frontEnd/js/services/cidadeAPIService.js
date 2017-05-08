angular.module("polk").factory("cidadesAPI", function ($http, config) {
    var _getCidades = function (_descCidade, _skip, _take) {
        return $http({
            url: config.baseURL + "/cidades",
            method: "GET",
            params: {
                cmd: "Select",
                descCidade: _descCidade,
                skip: _skip,
                take: _take
            }
        });
    }
    return {
        getCidades: _getCidades
    }
});