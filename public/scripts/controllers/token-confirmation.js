
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('TokenConfirmationController', TokenConfirmationController);

    TokenConfirmationController.$inject = ['$scope', '$rootScope', '$state', 'User', 'Easy'];

    function TokenConfirmationController ($scope, $rootScope, $state, User, Easy) {
      $rootScope.roles = [
        'ROLE_USER',
        'ROLE_ADMIN',
        'ROLE_ADMIN_ASSIST',
        'ROLE_COORDINATOR',
        'ROLE_TEACHER',
        'ROLE_STUDENT'
      ];

      $scope.roles = [];
      $scope.token_code = null;
      $scope.extraParents = [];


      $scope.searchRoles = function (token) {
          User.getUserByToken(token).then(function (user) {
              $scope.user = user;

              if (user.role === 'parent') {
                  User.getStudentByParentId(user._id).then(function (student) {
                      $scope.student = student;
                  });
              }
          });
      };

      $scope.addParent = function () {
          $scope.extraParents.push({role: 'parent'});
      };
      
      $scope.register = async function () {
          if ($scope.user.role === 'parent') {
              var studentObj = {
                  allergies: $scope.student.allergies,
                  disabilities: $scope.student.disabilities,
              };

              var studentUser = {
                  birthday: $scope.student.birthday,
                  password: $scope.student.password,
                  phone: $scope.student.phone,
                  address: $scope.user.address,
              };

              var parentUser = {
                  birthday: $scope.user.birthday,
                  password: $scope.user.password,
                  phone: $scope.user.phone,
                  address: $scope.user.address,
                  reg_token: null
              };

              await User.updateUser($scope.student.user_id, studentUser);

              await User.updateUser($scope.user._id, parentUser);

              var parentIds = [];
              for (let parent of $scope.extraParents) {
                  parent.registered_on = new Date();
                  parentUser = await Easy.create('users', parent);
                  parentIds.push(parentUser._id);
              }

              studentObj.parent_ids = $scope.student.parent_ids.concat(parentIds);

              await User.updateStudent($scope.student._id, studentObj);
          }

          else {
              var user = {
                  birthday: $scope.user.birthday,
                  password: $scope.user.password,
                  phone: $scope.user.phone,
                  address: $scope.user.address,
                  reg_token: null
              };

              await User.updateUser($scope.user._id, user);
          }

          $scope.$apply();
          alert('Cadastro realizado com sucesso');
          $state.go('login');
      }
    }

})();
