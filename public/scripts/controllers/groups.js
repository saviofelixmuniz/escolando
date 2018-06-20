
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['$scope', 'Easy', 'User', 'Toaster', 'Principal'];

    function GroupsController ($scope, Easy, User, Toaster, Principal) {
        $scope.newGroup = {};
        $scope.createGroups = false;

        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        Easy.getAll('courses').then(function (courses) {
            $scope.courses = courses;
        });

        $scope.$watch('course', function (course) {
            Easy.query('groups', {'course_id' : course}).then(function (groups) {
                $scope.groups = groups;
            });
        });

        $scope.$watch('group', function (group) {
            User.getStudentsInGroup(group).then(function (students) {
                $scope.students = students;
            })
        });

        $scope.getCourseNameById = function(course_id) {
          for (var i in $scope.courses) {
            if (course_id == $scope.courses[i]._id) {
              return $scope.courses[i].name;
            }
          }
          return null;
        }

        $scope.createGroup = function() {
            Easy.create('groups', $scope.newGroup).then(function (group) {
                $scope.newGroup = {};
            });

            Toaster.pop('success', 'Turma criada!',
              '<ul><li>' + $scope.newGroup.name +
                ' / ' + $scope.getCourseNameById($scope.newGroup.course_id) + '</li></ul>',
              5000, 'trustedHtml');
        };

        $scope.toggleGroups = function () {
            $scope.createGroups = false;
        }

        $scope.toggleCreateGroups = function () {
            $scope.createGroups = true;
        }
    }

})();
