
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('IntroController', IntroController);

    IntroController.$inject = ['$scope', '$rootScope', '$state'];

    function IntroController ($scope, $rootScope, $state) {

      $scope.login = {}

      $scope.create_session = function() {
        console.log($scope.login);
      }

    }

})();
