angular.module('escolando').factory('Marks', function ($http) {
    return {
        getGroupSubjectMarks: function (groupId, subjectId) {
            return $http.get(`api/groups/${groupId}/subjects/${subjectId}/marks`).then(function (res) {
                return res.data;
            });
        }
    }
});