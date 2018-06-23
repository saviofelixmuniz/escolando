
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$scope', 'Easy', 'Principal'];

    function AttendanceController ($scope, Easy, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        Easy.getAll('courses').then(function (courses) {
            $scope.courses = courses;
        });

        Easy.getAll('subjects').then(function (subjects) {
          $scope.subjects = subjects;
        });
    }

})();
