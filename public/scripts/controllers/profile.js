(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$state', 'Principal', 'Easy', 'User'];

    function ProfileController ($scope, $state, Principal, Easy, User) {
        Principal.identity(true).then(function (user) {
            $scope.user = user;
            $scope.user.password = '';
        });

        $scope.error = false;

        $scope.updateUser = function () {
            if (!$scope.user.password) {
                delete $scope.user.password;
            }
            console.log($scope.user);
            User.updateUser($scope.user._id, $scope.user).then(function () {
                $state.go('home');
            }).catch(function () {
                $scope.error = true;
            });
        }

    }

})();
