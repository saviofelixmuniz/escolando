angular.module('escolando').directive('cadastroGeralForm', function () {
    return {
        templateUrl : '/views/directives/cadastro-geral-form.html',
        scope: {
            user : '=',
            isPreSelected: '='
        },
        restrict: 'AE',
        controller: function ($scope, CONSTANTS) {
            $scope.states = CONSTANTS.STATES;
            $scope.params = {};

        }
    }
});
