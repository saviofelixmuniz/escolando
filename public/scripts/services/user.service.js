/**
 * @author Sávio Muniz
 */
angular.module('escolando').factory('User', function ($http) {
    const USERS = 'api/users/';

    return {
        getUserByToken : function (token) {
            return $http.get(USERS + `token/${token}`).then(function (res) {
                return res.data;
            });
        },
        getStudentByParentId: function (parentId) {
            return $http.get(USERS + `students/parent/${parentId}`).then(function (res) {
                return res.data;
            });
        },
        updateStudent: function (studentId, studentObj) {
            return $http.put(USERS + `student/${studentId}`, studentObj, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },
        updateUser: function (userId, userObj) {
            return $http.put(USERS + `${userId}`, userObj, { headers: {'Content-Type': 'application/json; charset=UTF-8' } });
        },
        registerToken: function (form) {
            return $http.post(USERS, form, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            });
        },
        getStudentsInGroup : function (groupId) {
            return $http.get(USERS + `students/groups/${groupId}`).then(function (res) {
                return res.data;
            });
        }
    }
});