
angular.module('escolando').factory('Attendance', function ($http) {
    const ATTENDANCE = 'api/groups/';

    return {
        registerAttendanceList: function (form, groupId) {
            return $http.post(ATTENDANCE + `${groupId}/attendance`, form, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            });
        }
    }
});