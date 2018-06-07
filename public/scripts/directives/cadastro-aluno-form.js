
angular.module('escolando').directive('cadastroAlunoForm', function () {
    return {
        templateUrl : '/views/directives/cadastro-aluno-form.html',
        scope: {
            student : '='
        },
        restrict: 'AE',
        controller: function ($scope, Easy) {
            $scope.$watchCollection('student', function (student) {
                Easy.getOne('courses', student.course_id).then(function (course) {
                    $scope.student.course = course.name;
                });

                Easy.getOne('groups', student.group_id).then(function (course) {
                    $scope.student.group = course.name;
                });
            });
        }
    }
});
