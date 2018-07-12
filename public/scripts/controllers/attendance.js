
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$scope', 'Easy', 'User', 'Toaster', 'Principal'];

    function AttendanceController ($scope, Easy, User, Toaster, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
            if (user.role==='teacher') $scope.loadTeacherInformation(user);
        });

        $scope.newSubject = {};
        $scope.attendanceList = {};

        Easy.getAll('courses').then(function (courses) {
            $scope.courses = courses;
        });

        Easy.getAll('subjects').then(function (subjects) {
          $scope.subjects = subjects;
        });

        Easy.getAll('groups').then(function (groups) {
            $scope.groups = groups;
        });

        $scope.loadTeacherInformation = function (user) {
            User.getTeacherById(user._id).then(function (teacher) {
              console.log(teacher);
              $scope.teacher = teacher;
            });
        };
    }

})();
