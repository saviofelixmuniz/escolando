
angular.module('escolando').factory('Message', function ($http) {
    const MESSAGE = 'api/messages/';

    return {
        sendMessage: function (message) {
            return $http.post(MESSAGE, message, { headers: {'Content-Type': 'application/json; charset=UTF-8' } }).then(function (res) {
                return res.data;
            });
        },

        getMessagesWithUser: function (userId) {
            return $http.get(MESSAGE + `user/${userId}`).then(function (res) {
                return res.data;
            });
        },

        getUsersMessaged: function () {
            return $http.get(MESSAGE + 'users').then(function (res) {
                return res.data;
            });
        }
    }
});