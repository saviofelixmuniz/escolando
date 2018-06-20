/**
 * @author Sávio Muniz
 */
angular.module('escolando').directive('navbar', function () {
    return {
        templateUrl : '/views/directives/nav.html',
        scope: {
            user : '='
        },
        controller: function ($scope) {
            console.log($scope.user);
            $scope.teacherRole = $scope.user.role === "teacher";
            $scope.adminRole = $scope.user.role === "admin";
            $scope.coordinatorRole = $scope.user.role === "coordinator";
            $scope.admin_auxRole = $scope.user.role === "admin_aux";
            $scope.studentRole = $scope.user.role === "student";
            $scope.parentRole = $scope.user.role === "parent";

            $scope.userEnableGroups = function () {
                return $scope.teacherRole || $scope.adminRole;
            }

            $scope.userEnableTokens = function() {
                return $scope.coordinatorRole || $scope.adminRole || $scope.admin_auxRole;
            }

            $scope.userEnableAnnouncements = function() {
                return $scope.adminRole || $scope.parentRole || $scope.studentRole || $scope.teacherRole || $scope.coordinatorRole;
            }

            $scope.userEnableActivities = function() {
                return $scope.adminRole || $scope.parentRole || $scope.studentRole || $scope.teacherRole;
            }

            $scope.userEnableMarks = function() {
                return $scope.adminRole || $scope.parentRole || $scope.studentRole || $scope.teacherRole;
            }
        }
    }
});
