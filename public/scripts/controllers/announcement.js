(function() {
    'use strict';

    angular
        .module('escolando')
        .controller('AnnouncementsController', AnnouncementsController);

    AnnouncementsController.$inject = ['$scope', 'Easy', 'User', 'Announcement', 'Toaster', 'Principal', 'Courses', '$state'];

    function AnnouncementsController ($scope, Easy, User, Announcements, Toaster, Principal, Courses, $state) {
        Principal.identity().then(function (user) {
            $scope.user = user;
            if (user.role==='student' || user.role==='parent') $scope.initAnnouncements(user);
        });

        $scope.announcements = [];
        $scope.createAnnouncements = false;
        $scope.newAnnouncement = {};
        $scope.group = Courses.getSelectedGroup();

        if (!$scope.group) {
            $state.go('groups');
            return;
        } else {
            loadAnnouncements($scope.group);
        }

        $scope.initAnnouncements = function(user) {
            if (user.role==='student') {
                Easy.query('student', {'user_id': user._id}).then(function (student) {
                  Easy.query('announcement', {'group_id': student[0].group_id}).then(function (announcements) {
                      $scope.announcements = announcements;
                  });
                });
            } else if (user.role==='parent') {
                User.getStudentByParentId(user._id).then(function (student) {
                    Easy.query('announcement', {'group_id': student.group_id}).then(function (announcements) {
                       $scope.announcements = announcements;
                    });
                });
            }
        };

        function loadAnnouncements (group) {
            if (!group && ($scope.user.role==='coordinator' || $scope.user.role==='teacher' || $scope.user.role==='admin')) {
                $scope.announcements = [];
                return;
            }

            Easy.query('announcement', {'group_id': group._id}).then(function (announcements) {
                $scope.announcements = announcements;
            });
        }

        $scope.createAnnouncement = function () {
            $scope.newAnnouncement.group_id = $scope.group._id;
            Easy.create('announcement', $scope.newAnnouncement).then(function (announcement) {
                $scope.newAnnouncement = {};
                loadAnnouncements($scope.group);
            });

            // Toaster.pop('success', "title", 'jumping to https://google.com.', 15000, 'trustedHtml');
            Toaster.pop(
              'success',
              'Comunicado criado!',
              '<ul><li>' + $scope.newAnnouncement.title + '</li></ul>',
              5000,
              'trustedHtml');
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
