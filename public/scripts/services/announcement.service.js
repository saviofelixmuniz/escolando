/**
 * @author André Gonçalves
 */
angular.module('escolando').factory('Announcement', function ($http) {
    const ANNOUNCEMENTS = 'api/announcements/';

    return {
        getAnnouncementsInGroup : function (groupId) {
            return $http.get(ANNOUNCEMENTS + `groups/${groupId}`).then(function (res) {
                return res.data;
            });
        }
    }
});