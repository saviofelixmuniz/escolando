
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['$scope', 'Easy', 'User', 'Toaster', 'Principal', 'Courses'];

    function GroupsController ($scope, Easy, User, Toaster, Principal, Courses) {
        $scope.newGroup = {};
        $scope.createGroups = false;
        $scope.groupSelected = Courses.getSelectedGroup();
        $scope.courseSelected = Courses.getSelectedCourse();
        $scope.students = [];

        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        getAllGroups();

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
    }

})();
