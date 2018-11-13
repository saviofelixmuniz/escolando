
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$scope', 'Courses', '$state', 'Easy', 'User', 'CONSTANTS', 'Attendance', 'Toaster', 'Principal'];

    function AttendanceController ($scope, Courses, $state, Easy, User, CONSTANTS, Attendance, Toaster, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;

            if ($scope.user.role === "student" || $scope.user.role === "parent") {
                Easy.query("student", {user_id: $scope.user._id}).then(function (student) {
                    Easy.getOne("groups", student[0].group_id).then(function (group) {
                        $scope.group = group;
                        console.log($scope.group);
                        if (!$scope.group) {
                            $state.go('groups');
                            return;
                        }

                        loadStudents($scope.group._id);
                        $scope.loadStudentAttendance($scope.user)
                    })

                });
            }
            else {
                $scope.group = Courses.getSelectedGroup();
                var course = Courses.getSelectedCourse();

                if (!$scope.group) {
                    $state.go('groups');
                    return;
                }

                loadStudents($scope.group._id);
            }
        });

        $scope.studentAttendance = {};
        $scope.attendanceDate = new Date();
        $scope.attendanceWeek = getWeek(new Date());
        $scope.markAllTrue = [];

        function getWeek(date) {
            var weekDates = [];

            for(var i=0; i<7; i++) {
                var dayDate = new Date(date.getTime());
                dayDate.setDate(dayDate.getDate() - dayDate.getDay() + i);
                weekDates.push(dayDate);
            }

            return weekDates;
        }

        $scope.$watch('attendanceDate', function (date) {
            if (!date || !$scope.group) return;
            $scope.attendanceWeek = getWeek(date);
            loadStudents($scope.group._id);
        });

        function formatDate(date) {
            return date.getFullYear() + "-" +
            ("0"+(date.getMonth()+1)).slice(-2) + "-" +
            ("0" + date.getDate()).slice(-2);
        }

        function loadStudents(group) {
            if (!group) return;
            $scope.students = [];
            User.getStudentsInGroup(group).then(function (students) {
                startStudentAttendance(students);
                $scope.students = students;

                var attendancePromises = [];
                for (var date of $scope.attendanceWeek) {
                    attendancePromises.push(Easy.query('attendance', {'date': formatDate(date)}));
                }

                Promise.all(attendancePromises).then(function (attendances) {
                    for (var i = 0; i<attendances.length; i++) {
                        for (var att of attendances[i]) {
                            for (var student of $scope.students) {
                                if (student._id == att.student_id) {
                                    student.attended[i] = att.attended;
                                }
                            }
                        }
                    }
                    $scope.$apply();
                });

            });
        }

        function startStudentAttendance(students) {
            for (var student of students) {
                student.attended = [];
            }

            console.log(students);
        }

        $scope.registerAttendance = function (groupId) {
            $scope.attendanceLists = [];
            for (var i = 0; i<7; i++) {
                $scope.attendanceLists.push([]);
                angular.forEach($scope.students, function(student){
                    $scope.attendanceLists[i].push({'id': student._id, 'attended': student.attended[i] || false});
                });
            }

            var registerPromises = [];

            for (var i=0; i<$scope.attendanceWeek.length; i++) {
                var form = {
                    'students' : $scope.attendanceLists[i],
                    'date': formatDate($scope.attendanceWeek[i])
                };

                registerPromises.push(Attendance.registerAttendanceList(form, groupId));
            }

            Promise.all(registerPromises).then(function (data) {
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

        $scope.markAll = function (index) {
            $scope.markAllTrue[index] = !$scope.markAllTrue[index];

            angular.forEach($scope.students, function(student){
                student.attended[index] = $scope.markAllTrue[index];
            });

        }

        $scope.getDayOfWeek = function(date) {
            var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

            return days[date.getDay()];
        };

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
