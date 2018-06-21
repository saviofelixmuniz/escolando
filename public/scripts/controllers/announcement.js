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

        Easy.getAll('courses').then(function (courses) {
            $scope.courses = courses;
        });

        $scope.loadGroups = function (course) {
            if (!course) {
                $scope.announcements = [];
                return;
            }

            Easy.query('groups', {'course_id' : course}).then(function (groups) {
                $scope.groups = groups;
            });
        };

        // $scope.initAnnouncements = function() {
        //     console.log("loading");
        //     console.log($scope.user);
        //     Easy.query('announcement', {'group_id': $scope.user.group_id}).then(function (announcements) {
        //         $scope.announcements = announcements;
        //     });
        //
        //     if ($scope.user.role==='student') {
        //         console.log("student");
        //         $scope.announcements.filter(function isFromSameGroup(announcement) {
        //             return announcement.group_id === $scope.user.role.group_id;
        //         });
        //     } else if ($scope.user.role==='parent') {
        //         console.log("parent");
        //         Easy.query('students', {parent_ids: [user._id]}).then(function (student) {
        //             console.log(student);
        //             $scope.announcements.filter(function isFromSameGroup(announcement) {
        //                 return announcement.group_id === student.group_id;
        //             });
        //         });
        //     }
        // };

        $scope.loadAnnouncements = function (group) {
            if (!group && ($scope.user.role==='coordinator' || $scope.user.role==='teacher' || $scope.user.role==='admin')) {
                $scope.announcements = [];
                return;
            }

            Easy.query('announcement', {'group_id': group._id}).then(function (announcements) {
                $scope.announcements = announcements;
            });
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
            if ($scope.user.role === 'student' || $scope.user.role === 'parent') $scope.createAnnouncements = false;
            else $scope.createAnnouncements = !$scope.createAnnouncements;
        };

        $scope.toggleCreateAnnouncements = function () {
            $scope.createAnnouncements = !$scope.createAnnouncements;
        };
    }

})();
