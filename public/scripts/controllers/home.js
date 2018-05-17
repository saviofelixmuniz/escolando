angular.module('escolando').controller('HomeCtrl', function ($scope, $rootScope) {
    $scope.student = {};
    $rootScope.students = [];

    $scope.register = function () {
        $rootScope.students.push($scope.student);
    }
});