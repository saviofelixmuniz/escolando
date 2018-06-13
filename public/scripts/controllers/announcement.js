
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AnnouncementsController', AnnouncementsController);

    AnnouncementsController.$inject = ['$scope', 'Easy', 'User', 'Announcement'];

    function AnnouncementsController ($scope, Easy, User, Announcements) {
        $scope.announcements = [];
        $scope.createAnnouncements = false;

        $scope.newAnnouncement = {};

        Easy.getAll('courses').then(function (courses) {
            $scope.courses = courses;
        });

        Easy.getAll('announcement').then(function (announcements) {
            $scope.announcements = announcements;
        });

        $scope.$watch('course', function (course) {
            Easy.query('groups', {'course_id' : course}).then(function (groups) {
                $scope.groups = groups;
            });
        });

        $scope.$watch('group', function (group) {
            Easy.query('announcement', {'group_id': group}).then(function (announcements) {
                $scope.announcements = announcements;
            })
        });

        $scope.createAnnouncement = function () {
            $scope.newAnnouncement.group_id = $scope.group;
            Easy.create('announcement', $scope.newAnnouncement).then(function (announcement) {
                $scope.newAnnouncement = {};
            });
        }

        $scope.toggleAnnouncements = function () {
            $scope.createAnnouncements = false;
        }

        $scope.toggleCreateAnnouncements = function () {
            $scope.createAnnouncements = true;
        }
    }

})();