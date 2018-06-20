(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AnnouncementsController', AnnouncementsController);

    AnnouncementsController.$inject = ['$scope', 'Easy', 'User', 'Announcement', 'Toaster', 'Principal'];

    function AnnouncementsController ($scope, Easy, User, Announcements, Toaster, Principal) {
        Principal.identity().then(function (user) {
            $scope.user = user;
        });

        $scope.announcements = [];
        $scope.createAnnouncements = false;
        $scope.newAnnouncement = {};
        $scope.group = null;

        $scope.teacherRole = $scope.user.role === "teacher";
        $scope.adminRole = $scope.user.role === "admin";
        $scope.coordinatorRole = $scope.user.role === "coordinator";

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

        $scope.toggleRole = function () {
            return $scope.teacherRole || $scope.adminRole || $scope.coordinatorRole;
        }

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

            // Toaster.pop('success', "title", 'jumping to https://google.com.', 15000, 'trustedHtml');
            Toaster.pop('success', 'Comunicado criado!', '<ul><li>' + $scope.newAnnouncement.title + '</li></ul>', 5000, 'trustedHtml');
            // Toaster.pop('error', "title", '<ul><li>Render html</li></ul>', null, 'trustedHtml');
            // Toaster.pop('wait', "title", null, null, 'template');
            // Toaster.pop('warning', "title", "myTemplate.html", null, 'template');
            // Toaster.pop('note', "title", "text");
        };

        $scope.toggleAnnouncements = function () {
            $scope.createAnnouncements = false;
        };

        $scope.toggleCreateAnnouncements = function () {
            $scope.createAnnouncements = true;
        };
    }

})();
