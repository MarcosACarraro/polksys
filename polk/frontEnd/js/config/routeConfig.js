angular.module("polk").config(function ($routeProvider) {
    $routeProvider
      .when("/cidade", {
          templateUrl: "view/cidade.html",
          controller: "cidadeCtrl"
      }).when("/editCidade",{
          templateUrl:"view/editCidade.html",
          controller:"editCidadeCtrl"
      }).otherwise({
          template: '<h1>None</h1><p>Nothing has been selected</p>'
      });
});
