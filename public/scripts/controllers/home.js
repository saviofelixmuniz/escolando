(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'Principal', 'Easy', 'User'];

    function HomeController ($scope, $state, Principal, Easy, User) {
      $scope.student = {};

      Easy.getAll('courses').then(function (courses) {
          $scope.courses = courses;
      });

      $scope.registerToken = function () {
          var form = {
              "student_name" : $scope.student.name,
              "student_email" : $scope.student.email,
              "parent_name": $scope.parent.name,
              "parent_email": $scope.parent.email,
              "course_id": $scope.student.course,
              "group_id": $scope.student.group,
              "role" : "student"
          };

          User.registerToken(form).then(function (res) {
              $scope.token = res.token;
              $scope.student = {};
              $scope.groups = [];
              $scope.parent = {};
              alert('Aluno cadastrado com sucesso. Token: ' + $scope.token);
          });
      };
      
      $scope.$watch('student.course', function (course) {
          Easy.query('groups', {'course_id' : course}).then(function (groups) {
              $scope.groups = groups;
          });
      });

    }

})();
