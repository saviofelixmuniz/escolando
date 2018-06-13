
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'Auth', 'Principal'];

    function LoginController ($scope, $rootScope, $state, $timeout, Auth, Principal) {

      $scope.email = '';
      $scope.password = '';
      $scope.rememberMe = false;
      $scope.authenticationError = false;

      Auth.logout();

      $scope.login = function login (event) {
          event.preventDefault();
          Auth.login({
              email: $scope.email,
              password: $scope.password,
              rememberMe: $scope.rememberMe
          }).then(function () {
              $scope.authenticationError = false;
              $rootScope.$broadcast('authenticationSuccess');
              $state.go('home');
          }).catch(function () {
              $scope.authenticationError = true;
          });
      }
    }

})();
