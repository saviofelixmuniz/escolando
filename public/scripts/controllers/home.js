(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'Principal', 'Easy', 'User'];

    function HomeController ($scope, $state, Principal, Easy, User) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.student = {};
        $scope.coordinator = {};
        $scope.teacher = {};
        $scope.parent = {};
        $scope.params = {};

        Easy.getAll('courses').then(function (courses) {
          $scope.courses = courses;
        });

        Easy.getAll('subjects').then(function (subjects) {
          $scope.subjects = subjects;
        });

        Easy.getAll('course_section').then(function (courseSections) {
          $scope.courseSections = courseSections;
        });

        $scope.registerToken = function () {
          if ($scope.registering === 'student') {
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
          }

          else if ($scope.registering === 'teacher') {
              var form = {
                  'name' : $scope.teacher.name,
                  'email' : $scope.teacher.email,
                  'subject_id' : $scope.teacher.subject,
                  'role' : 'teacher'
              };

              User.registerToken(form).then(function (res) {
                  $scope.teacher = {};
                  var token = res.token;

                  alert('Professor cadastrado com sucesso. Token: ' + token);
              });
          }

          else {
              var form = {
                  'name' : $scope.coordinator.name,
                  'email' : $scope.coordinator.email,
                  'course_section_id' : $scope.coordinator.subject,
                  'role' : 'coordinator'
              };
              
              User.registerToken(form).then(function (res) {
                 $scope.coordinator = {};
                 var token = res.token;

                 alert('Coordenador cadastrado com sucesso. Token: ' + token);});
          }

        };

        $scope.$watch('student.course', function (course) {
          Easy.query('groups', {'course_id' : course}).then(function (groups) {
              $scope.groups = groups;
          });
        });

        $scope.$watch('params.role', function (role) {
            console.log(role);
            if (role) {
                $scope.registering = getRegisteringType(role);
                console.log($scope.registering);
            }
        });

        function getRegisteringType(role) {
            return role === 'aux_admin' ? 'student' :
                role === 'coordinator'? 'teacher' : 'auxCoordinator'
        }

    }

})();
