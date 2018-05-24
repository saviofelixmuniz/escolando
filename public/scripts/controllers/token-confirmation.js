
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('TokenConfirmationController', TokenConfirmationController);

    TokenConfirmationController.$inject = ['$scope', '$rootScope', '$state'];

    function TokenConfirmationController ($scope, $rootScope, $state) {

      $rootScope.roles = [
        'ROLE_USER',
        'ROLE_ADMIN',
        'ROLE_ADMIN_ASSIST',
        'ROLE_COORDINATOR',
        'ROLE_TEACHER',
        'ROLE_STUDENT'
      ];

      $scope.roles = [];
      $scope.token_code = null;

      $scope.search_roles = function() {

      }

    }

})();
