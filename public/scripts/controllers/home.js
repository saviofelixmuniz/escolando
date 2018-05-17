(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$rootScope', '$state'];

    function HomeController ($scope, $rootScope, $state) {

      $scope.student = {};
      $rootScope.students = [];

      $scope.register = function () {
          $rootScope.students.push($scope.student);
      }
    }
})();
