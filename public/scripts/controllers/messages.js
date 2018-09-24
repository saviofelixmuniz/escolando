angular.module('escolando').controller('MessagesController', function ($scope, $state, $filter, Principal, Message) {
    Principal.identity().then(function (user) {
        $scope.user = user;
        getUsers();
    });

    $scope.selectedUser = undefined;
    $scope.message = {
        content: ''
    };
    $scope.messages = [];

    function getUsers() {
        Message.getUsersMessaged().then(function (users) {
            $scope.users = users;
        })
    }

    $scope.selectUser = function (user) {
        $scope.selectedUser = user;
        loadMessages(user);
    };

    $scope.deselectUser = function () {
        $scope.selectedUser = undefined;
        $scope.messages = [];
        getUsers();
    };

    $scope.sendMessage = function () {
        $scope.message.to = $scope.selectedUser._id;
        Message.sendMessage($scope.message).then(function (message) {
            $scope.message = {
                content: ''
            };
            $scope.messages.push(message);
        });
    };

    function loadMessages(user) {
        Message.getMessagesWithUser(user._id).then(function (messages) {
            $scope.messages = messages;
        })
    }

});