
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AccountsController', AccountsController);

    AccountsController.$inject = ['$scope', 'Easy', 'Principal'];

    function AccountsController ($scope, Easy, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.courses = [];
        $scope.subjects = [];
        $scope.teacherSelected = undefined;
        $scope.teachers = [];

        loadTeachers();

        function loadCourses() {
            console.log('carregou series');
            Easy.query('courses').then(function (courses) {
                $scope.courses = courses;
            });
        }

        function loadSubjects() {
            console.log('carregou disciplinas');
            if (!$scope.teacherSelected) return;
            Easy.query('subjects').then(function (subjects) {
                $scope.subjects = [];
                for (let subject of subjects) {
                    for (let course_id of subject.courses_id) {
                        if ($scope.teacherSelected.courses_enabled.indexOf(course_id) >= 0) {
                            $scope.subjects.push(subject);
                            break;
                        }
                    }
                }
            });
        }

        function loadTeachers() {
            console.log('carregou professores');
            Easy.query('teacher').then(function (teachers) {
                $scope.teachers = teachers;
                for (let teacher of $scope.teachers) {
                    Easy.getOne('users', teacher.user_id).then(function (user) {
                        teacher.user = user;
                    });
                }
            });
        }

    }

})();
