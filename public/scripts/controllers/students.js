
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('StudentsController', StudentsController);

    StudentsController.$inject = ['$scope', 'Easy', 'User', 'Toaster', 'Principal', 'Courses'];

    function StudentsController ($scope, Easy, User, Toaster, Principal, Courses) {

        $scope.newGroup = {};
        $scope.createGroups = false;
        $scope.groupSelected = Courses.getSelectedGroup();
        $scope.courseSelected = Courses.getSelectedCourse();
        $scope.students = [];
        $scope.studentSelected = undefined;
        $scope.studentInfo = false;

        Principal.identity().then(function (user) {
            $scope.user = user;
            if (user.role==='teacher') {
              User.getTeacherById($scope.user._id).then(function (teacher) {
                $scope.teacher = teacher;
              });
            }
        });

        getAllGroups();

        $scope.selectStudent = function (student) {
            $scope.studentSelected = student;
            console.log(student);
            $scope.studentSelected['parents'] = [];
            for (let parent_id of student.parent_ids) {
              User.getParentById(parent_id).then(function (parents) {
                  $scope.studentSelected['parents'].push(parents);
              });
            }

            $scope.studentSelected['attendance'] = undefined;
            Easy.query('attendance', {'student_id': student._id, 'attended': false}).then(function (studentAttendance) {
                $scope.studentSelected['attendance'] = studentAttendance;
            });

            $scope.studentInfo = true;
        };

        $scope.selectGroup = function (group, course) {
            Courses.selectGroup(group, course);
            $scope.groupSelected = Courses.getSelectedGroup();
            $scope.courseSelected = Courses.getSelectedCourse();
            getStudents(group);
        };

        $scope.getCourseNameById = function(course_id) {
          for (var i in $scope.courses) {
            if (course_id == $scope.courses[i]._id) {
              return $scope.courses[i].name;
            }
          }
          return null;
        };

        $scope.createGroup = function() {
            Easy.create('groups', $scope.newGroup).then(function (group) {
                $scope.newGroup = {};
                getAllGroups();
            });

            Toaster.pop('success', 'Turma criada!',
              '<ul><li>' + $scope.newGroup.name +
                ' / ' + $scope.getCourseNameById($scope.newGroup.course_id) + '</li></ul>',
              5000, 'trustedHtml');
        };

        $scope.toggleGroups = function () {
            $scope.createGroups = false;
        };

        $scope.toggleCreateGroups = function () {
            $scope.createGroups = true;
        };

        function getStudents (group) {
            User.getStudentsInGroup(group._id).then(function (students) {
                $scope.students = students;
            });
        }

        function getAllGroups () {
            // TODO: Se for professor, carregar apenas as turmas do professor
            Courses.getAll().then(function (courses) {
                courses.forEach((course) => {
                    Easy.query('groups', {'course_id': course._id}).then(function (groups) {
                        course.groups = groups;
                    });
                });
                $scope.courses = courses;
            });

            if ($scope.groupSelected) {
                getStudents($scope.groupSelected);
            }

        }

        $scope.back = function () {
            console.log('voltou');
            $scope.studentSelected = undefined;
            $scope.studentInfo = false;
        }

    }

})();
