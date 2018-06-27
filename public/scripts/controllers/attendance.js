
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$scope', 'Easy', 'Toaster', 'Principal'];

    function AttendanceController ($scope, Easy, Toaster, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.newSubject = {};

        Easy.getAll('courses').then(function (courses) {
            $scope.courses = courses;
        });

        Easy.getAll('subjects').then(function (subjects) {
          $scope.subjects = subjects;
        });

        Easy.getAll('groups').then(function (groups) {
            $scope.groups = groups;
        });
    }

})();
