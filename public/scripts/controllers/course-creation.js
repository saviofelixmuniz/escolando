
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('CourseCreationController', CourseCreationController);

    CourseCreationController.$inject = ['$scope', 'Easy'];

    function CourseCreationController ($scope, Easy) {
        $scope.sections = [];
        $scope.courses = [];

        $scope.newSection = {};
        $scope.newCourse = {};
        $scope.newGroup = {};

        loadAll();

        $scope.createSection = function() {
            Easy.create('course_section', $scope.newSection).then(function (section) {
                loadSections();
                $scope.newSection = {};
            });
        };

        $scope.createCourse = function() {
            Easy.create('courses', $scope.newCourse).then(function (course) {
                $scope.newCourse = {};
            });
        };

        $scope.createGroup = function() {
            Easy.create('groups', $scope.newGroup).then(function (group) {
                $scope.newGroup = {};
            });
        };

        function loadSections() {
            Easy.query('course_section').then(function (sections) {
                $scope.sections = sections;
            });
        }

        function loadCourses() {
            Easy.query('courses').then(function (courses) {
                $scope.courses = courses;
            });
        }

        function loadAll() {
            loadSections();
            loadCourses();
        }
    }

})();
