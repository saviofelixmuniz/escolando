
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['$scope', 'Easy', 'User'];

    function GroupsController ($scope, Easy, User) {
        $scope.newGroup = {};
        $scope.createGroups = false;

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

                console.log($scope.students);
            })
        });

        $scope.createGroup = function() {
            Easy.create('groups', $scope.newGroup).then(function (group) {
                $scope.newGroup = {};
            });
        };

        $scope.toggleGroups = function () {
            $scope.createGroups = false;
        }

        $scope.toggleCreateGroups = function () {
            $scope.createGroups = true;
        }
    }

})();
