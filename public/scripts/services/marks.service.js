angular.module('escolando').factory('Marks', function ($http) {
    return {
        getGroupSubjectMarks: function (groupId, subjectId) {
            return $http.get(`api/groups/${groupId}/subjects/${subjectId}/marks`).then(function (res) {
                return res.data;
            });
        },
        commitMarks: function (groupId, subjectId, marks) {
            return $http.post(`api/groups/${groupId}/subjects/${subjectId}/marks`, marks, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            });
        }
    }
});