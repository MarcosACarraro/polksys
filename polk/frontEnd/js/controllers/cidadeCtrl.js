angular.module("polk").controller("cidadeCtrl", function ($scope, cidadesAPI) {
    $scope.msg = "cidade";

    $scope.toShow = false;

    $scope.cidades = [];

    var carregarCidades = function (_descCidade, _skip, _take) {
        cidadesAPI.getCidades(_descCidade, _skip, _take).then(function (response) {
                $scope.cidades = response.data;
                $scope.status = response.status;
                $scope.statusText = response.statusText;
        }).catch(function (response) {
            $scope.status = response.status;
            $scope.statusText = response.statusText;
        }).finally(function () {
            //todo;
       });
    }

    carregarCidades("", "0", "1000");

    $scope.toggleFilter = function (toShow) {
        $scope.toShow = !toShow;
    }

    $scope.editRow = function (id) {
        alert(id);
    }

    $scope.seach = function (filterCidade) {
        carregarCidades(filterCidade, "0", "1000");
    }

});