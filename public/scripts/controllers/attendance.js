
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

       // Easy.getAll('attendance').then(function (attendance) {
        //    $scope.attendance = attendance;
        //});

        $scope.loadTeacherInformation = function (user) {
            User.getTeacherById(user._id).then(function (teacher) {
              console.log(teacher);
              $scope.teacher = teacher;
            });
        };

        $scope.loadAttendanceList = function () {
            /*Easy.create('attendance', 
                {
                    'group_id': '5b2069269499f304f8bd9690',
                    'date' : '2018-07-12'
                }
                ).then(function (t) {
                console.log(t);
                $scope.attendanceList.push(t);
            });*/
            
        };

        $scope.initAttendances = function () {
           /*$scope.newAttendance = {
            "group_id": "5b0618fe8a9ff236423d9bf4",
            "date": "2018-08-05"
            }
            Easy.create('attendance', $scope.newAttendance).then(function (attendance) {
                console.log(attendance);
                 $scope.attendanceList.push(attendance);
            });*/
        };

    }

})();
