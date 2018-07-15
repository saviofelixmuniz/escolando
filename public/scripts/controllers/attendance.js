
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$scope', 'Easy', 'User', 'CONSTANTS', 'Attendance', 'Toaster', 'Principal'];

    function AttendanceController ($scope, Easy, User, CONSTANTS, Attendance, Toaster, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
            if (user.role==='teacher') $scope.loadTeacherInformation(user);
        });

        $scope.markAllTrue = true;

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

        $scope.registerAttendance = function (groupId) {

            $scope.attendanceList = []
            angular.forEach($scope.students, function(student){
                $scope.attendanceList.push({'id': student._id, 'attended': student.attended});
            })

            var form = {
                'students' : $scope.attendanceList
            };

            Attendance.registerAttendanceList(form, groupId).then(function (data) {
                console.log("registrou frequência!");
                console.log(data);
            });
        }

        $scope.loadTeacherInformation = function (user) {
            User.getTeacherById(user._id).then(function (teacher) {
              $scope.teacher = teacher;
              $scope.teacher.courses_enabled.push('5b2068d39499f304f8bd968e');
              $scope.teacher.courses_enabled.push('5b2068db9499f304f8bd968f');
              console.log($scope.teacher);
            });
        };

        $scope.markAll = function () {
            angular.forEach($scope.students, function(student){
                student.attended = $scope.markAllTrue;
            });

            $scope.markAllTrue = !$scope.markAllTrue;
            console.log($scope.markAllTrue);
        }

        $scope.getMonthYear = function() {
            var d = new Date();
            return CONSTANTS.MONTHS[d.getMonth()] + " " + d.getFullYear();
        }

        $scope.getAbsenceCount = function() {
            return 1;
        }

    }

})();
