
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['$scope', 'Easy', 'User', 'Principal'];

    function GroupsController ($scope, Easy, User, Principal) {
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

                console.log($scope.students);
            })
        });
    }

})();
