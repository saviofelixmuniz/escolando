
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
            Announcements.getAnnouncementsInGroup(group).then(function (announcements) {
                console.log(announcements);
                $scope.announcements = announcements;
            })
        });

        $scope.createAnnouncement = function () {
            Easy.create('announcement', $scope.newAnnouncement).then(function (announcement) {
                $scope.newAnnouncement = {};
            });
        }

        $scope.toggleAnnoucements = function () {
            $scope.createAnnouncements = false;
        }

        $scope.toggleCreateAnnoucements = function () {
            $scope.createAnnouncements = true;
        }
    }

})();