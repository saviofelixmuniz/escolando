
(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AnnouncementsController', AnnouncementsController);

    AnnouncementsController.$inject = ['$scope', 'Easy', 'User', 'Announcement', 'Principal'];

    function AnnouncementsController ($scope, Easy, User, Announcements, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.announcements = [];
        $scope.createAnnouncements = false;
        $scope.newAnnouncement = {};
        $scope.group = null;


        Easy.getAll('courses').then(function (courses) {
            console.log('pegou series');
            $scope.courses = courses;
        });

        $scope.loadGroups = function (course) {
            if (!course) {
                $scope.announcements = [];
                return;
            }
            console.log('serie mudou');
            Easy.query('groups', {'course_id' : course}).then(function (groups) {
                $scope.groups = groups;
            });
        };

        $scope.loadAnnouncements = function (group) {
            if (!group) {
                $scope.announcements = [];
                return;
            }
            console.log('turma mudou');
            Easy.query('announcement', {'group_id': group._id}).then(function (announcements) {
                $scope.announcements = announcements;
            })
        };

        $scope.createAnnouncement = function () {
            $scope.newAnnouncement.group_id = $scope.group._id;
            Easy.create('announcement', $scope.newAnnouncement).then(function (announcement) {
                $scope.newAnnouncement = {};
            });
        };

        $scope.toggleAnnouncements = function () {
            $scope.createAnnouncements = false;
        };

        $scope.toggleCreateAnnouncements = function () {
            $scope.createAnnouncements = true;
        }
    }

})();