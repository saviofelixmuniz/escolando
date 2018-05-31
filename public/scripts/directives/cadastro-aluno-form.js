
angular.module('escolando').directive('cadastroAlunoForm', function () {
    return {
        templateUrl : '/views/directives/cadastro-aluno-form.html',
        scope: {
            student : '='
        },
        restrict: 'AE',
        controller: function ($scope, Easy) {
            Easy.getOne('courses', $scope.student.course_id).then(function (course) {
                $scope.student.course = course.name;
            });

            Easy.getOne('groups', $scope.student.group_id).then(function (course) {
                $scope.student.group = course.name;
            });
        }
    }
});
