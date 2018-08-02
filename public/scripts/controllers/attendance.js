
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
            if (user.role==='parent' || user.role==='student') $scope.loadStudentAttendance(user);
        });

        $scope.markAllTrue = true;
        $scope.studentAttendance = {};
        $scope.attendanceDate = new Date();

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
            if (!group) return;
            loadStudents(group);
        });

        $scope.$watch('attendanceDate', function (date) {
            if (!date || !$scope.group) return;
            loadStudents($scope.group);
        });

        function loadStudents(group) {
            if (!group) return;
            $scope.students = [];
            User.getStudentsInGroup(group).then(function (students) {
                $scope.students = students;
                var date = $scope.attendanceDate.getFullYear() + "-" + ("0"+($scope.attendanceDate.getMonth()+1)).slice(-2) + "-" + ("0" + $scope.attendanceDate.getDate()).slice(-2);
                Easy.query('attendance', {'date': date}).then(function (studentAttendance) {
                    for (var att of studentAttendance) {
                        for (var student of $scope.students) {
                            if (student._id == att.student_id) {
                                student.attended = att.attended;
                            }
                        }
                    }
                });
            });
        }

        $scope.registerAttendance = function (groupId) {

            $scope.attendanceList = [];
            angular.forEach($scope.students, function(student){
                $scope.attendanceList.push({'id': student._id, 'attended': student.attended});
            });

            var form = {
                'students' : $scope.attendanceList,
                'date': $scope.getAttendanceDate()
            };

            console.log(form);
            Attendance.registerAttendanceList(form, groupId).then(function (data) {
                console.log("registrou frequência!");
                console.log(data);
                Toaster.pop('success', 'Frequência Registrada!', '', 5000, 'trustedHtml');
            });
        };

        $scope.loadTeacherInformation = function (user) {
            User.getTeacherById(user._id).then(function (teacher) {
              $scope.teacher = teacher;
            });
        };

        $scope.loadStudentAttendance = function (user) {
            if (user.role==='student') {
                Easy.query('student', {'user_id': user._id}).then(function (student) {
                    console.log(student[0]);
                    Easy.query('attendance', {'student_id': student[0]._id, 'attended': false}).then(function (studentAttendance) {
                        $scope.studentAttendance = studentAttendance;
                        console.log($scope.studentAttendance);
                    });
                });
            } else if (user.role==='parent') {
                User.getStudentByParentId(user._id).then(function (student) {
                    console.log(student);
                    Easy.query('attendance', {'student_id': student._id, 'attended': false}).then(function (studentAttendance) {
                        $scope.studentAttendance = studentAttendance;
                        console.log($scope.studentAttendance);
                    });
                });
            }
        }

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

        $scope.getAttendanceDate = function () {
            var today = new Date( $scope.attendanceDate );
            var dd = today.getDate();
            var MM = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) { dd = '0' + dd; }
            if (MM < 10) { MM = '0' + MM; }
            today = String(yyyy + '-' + MM + '-' + dd);
            return today;
        }
    }

})();
