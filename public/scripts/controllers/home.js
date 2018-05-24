
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$state', 'Principal'];

    function HomeController ($scope, $rootScope, $state, Principal) {

      $scope.student = {};
      $rootScope.students = [];

      $scope.register = function () {
          $rootScope.students.push($scope.student);
      }
    }

})();
