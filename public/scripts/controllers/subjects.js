
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
                $scope.back();
            });
        };

        $scope.updateSubject = function() {
            console.log('atualizou disciplina');
            delete $scope.subjectSelected.courses;
            Easy.update('subjects', $scope.subjectSelected._id, $scope.subjectSelected).then(function (subject) {
                $scope.newSubject = {
                    name: '',
                    course_id: undefined
                };
                $scope.back();
            });
        };

        $scope.addCourse = function (course) {
            if (!course) return;
            if (!$scope.updating) {
                $scope.newSubject.courses_id.push(course._id);
                $scope.newSubject.courses.push(course);
                removeElement($scope.courses, course._id);
            } else {
                $scope.subjectSelected.courses_id.push(course._id);
                $scope.subjectSelected.courses.push(course);
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
            } else {
                $scope.courses.push(course);
                removeElement($scope.subjectSelected.courses_id, course._id, true);
                removeElement($scope.subjectSelected.courses, course._id);
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
            $scope.subjectSelected.courses = [];
            loadCourses();
            for (let course_id of subject.courses_id) {
                Easy.getOne('courses', course_id).then(function (course) {
                    console.log('carregou serie');
                    $scope.subjectSelected.courses.push(course);
                    removeElement($scope.courses, course._id);
                });
            }
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
