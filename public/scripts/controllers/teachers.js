
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('TeachersController', TeachersController);

    TeachersController.$inject = ['$scope', 'Easy', 'Principal'];

    function TeachersController ($scope, Easy, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.courses = [];
        $scope.subjects = [];
        $scope.teacherSelected = undefined;
        $scope.teachers = [];
        $scope.updating = false;

        loadTeachers();

        $scope.updateTeacher = function() {
            console.log('atualizou professor');
            delete $scope.teacherSelected.courses;
            delete $scope.teacherSelected.subjects;
            delete $scope.teacherSelected.user;
            Easy.update('teacher', $scope.teacherSelected._id, $scope.teacherSelected).then(function (teacher) {
                $scope.back();
            });
        };

        $scope.addCourse = function (course) {
            if (!course) return;
            $scope.teacherSelected.courses_enabled.push(course._id);
            $scope.teacherSelected.courses.push(course);
            removeElement($scope.courses, course._id);
            console.log('adicionou serie');
        };

        $scope.removeCourse = function (course) {
            if (!course) return;
            $scope.courses.push(course);
            removeElement($scope.teacherSelected.courses_enabled, course._id, true);
            removeElement($scope.teacherSelected.courses, course._id);
            console.log('removeu serie');
        };

        $scope.addSubject = function (subject) {
            if (!subject) return;
            $scope.teacherSelected.subject_ids.push(subject._id);
            $scope.teacherSelected.subjects.push(subject);
            removeElement($scope.subjects, subject._id);
            console.log('adicionou serie');
        };

        $scope.removeSubject = function (subject) {
            if (!subject) return;
            $scope.subjects.push(subject);
            removeElement($scope.teacherSelected.subject_ids, subject._id, true);
            removeElement($scope.teacherSelected.subjects, subject._id);
            console.log('removeu serie');
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

        $scope.selectTeacher = function (teacher) {
            $scope.teacherSelected = teacher;
            $scope.teacherSelected.courses = [];
            $scope.teacherSelected.subjects = [];
            loadCourses();
            loadSubjects();
            console.log(teacher);
            for (let course_id of teacher.courses_enabled) {
                Easy.getOne('courses', course_id).then(function (course) {
                    console.log('carregou serie');
                    $scope.teacherSelected.courses.push(course);
                    removeElement($scope.courses, course._id);
                });
            }
            for (let subject_id of teacher.subject_ids) {
                Easy.getOne('subjects', subject_id).then(function (subject) {
                    console.log('carregou disciplina');
                    $scope.teacherSelected.subjects.push(subject);
                    removeElement($scope.subjects, subject._id);
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

        $scope.back = function () {
            console.log('voltou');
            $scope.teacherSelected = undefined;
            $scope.subjects = [];
            $scope.courses = [];
            $scope.updating = false;
            loadTeachers();
        }
    }

})();
