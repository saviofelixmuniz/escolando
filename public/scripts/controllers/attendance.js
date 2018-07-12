
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$scope', 'Easy', 'User', 'CONSTANTS', 'Toaster', 'Principal'];

    function AttendanceController ($scope, Easy, User, CONSTANTS, Toaster, Principal) {
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

        $scope.$watch('group', function (group) {
            User.getStudentsInGroup(group).then(function (students) {
                $scope.students = students;
            })
        });

        $scope.registerAttendance = function () {

        }

        $scope.loadTeacherInformation = function (user) {
            User.getTeacherById(user._id).then(function (teacher) {
              $scope.teacher = teacher;
              $scope.teacher.courses_enabled.push('5b2068d39499f304f8bd968e');
              $scope.teacher.courses_enabled.push('5b2068db9499f304f8bd968f');
              $scope.teacher.courses_enabled.push('5b2eb161b7479b4b9cabc7dc');
              console.log($scope.teacher);
            });
        };

        $scope.getMonthYear = function() {
            var d = new Date();
            return CONSTANTS.MONTHS[d.getMonth()] + " " + d.getFullYear();
        }

        $scope.getAbsenceCount = function() {
            return 1;
        }

    }

})();
