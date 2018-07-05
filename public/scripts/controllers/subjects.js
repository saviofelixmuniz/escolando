
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('SubjectsController', SubjectsController);

    SubjectsController.$inject = ['$scope', 'Easy', 'Principal'];

    function SubjectsController ($scope, Easy, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.courses = [];
        $scope.courseSelected = undefined;
        $scope.subjects = [];
        $scope.subjectSelected = undefined;
        $scope.teachers = [];
        $scope.creating = false;
        $scope.updating = false;

        loadSubjects();

        $scope.createSubject = function() {
            console.log('criou disciplina');
            delete $scope.newSubject.courses;
            Easy.create('subjects', $scope.newSubject).then(function (subject) {
                /*$scope.newSubject.course_id = $scope.courseSelected._id;
                $scope.subjectSelected = subject;
                $scope.creating = false;
                $scope.updating = true;*/
                $scope.back();
            });
        };

        $scope.updateSubject = function() {
            console.log('atualizou disciplina');
            Easy.update('subjects', $scope.subjectSelected._id, $scope.subjectSelected).then(function (subject) {
                $scope.newSubject = {
                    name: '',
                    course_id: undefined
                };
                $scope.subjectSelected = subject;
                $scope.creating = false;
                $scope.updating = true;
            });
        };

        $scope.addCourse = function (course) {
            if (!course) return;
            if (!$scope.updating) {
                $scope.newSubject.courses_id.push(course._id);
                $scope.newSubject.courses.push(course);
                removeElement($scope.courses, course._id);
            }
            console.log('adicionou disciplina');
        };

        $scope.removeCourse = function (course) {
            if (!course) return;
            if (!$scope.updating) {
                $scope.courses.push(course);
                removeElement($scope.newSubject.courses_id, course._id, true);
                removeElement($scope.newSubject.courses, course._id);
            }
            console.log('removeu disciplina');
        };

        function removeElement(array, id, direct) {
            for (let i=0; i < array.length; i++) {
                if (direct) {
                    if (array[i] == id) {
                        console.log('removeu');
                        array.splice(i, 1);
                        break;
                    }
                } else {
                    if (array[i]._id == id) {
                        console.log('removeu');
                        array.splice(i, 1);
                        break;
                    }
                }
            }
        }

        $scope.create = function () {
            $scope.creating = true;
            $scope.newSubject = {
                name: '',
                courses_id: [],
                courses: []
            };
            loadCourses();
        };

        $scope.selectSubject = function (subject) {
            $scope.subjectSelected = subject;
            $scope.updating = true;
        };

        function loadCourses() {
            console.log('carregou series');
            Easy.query('courses').then(function (courses) {
                $scope.courses = courses;
            });
        }

        function loadSubjects() {
            console.log('carregou disciplinas');
            Easy.query('subjects').then(function (subjects) {
                $scope.subjects = subjects;
            });
        }

        $scope.back = function () {
            console.log('voltou');
            $scope.subjectSelected = undefined;
            $scope.teachers = [];
            $scope.creating = false;
            $scope.updating = false;
            loadSubjects();
        }
    }

})();
