(function() {
    'use strict';

    angular
        .module('escolando')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', '$sessionStorage', '$q'];

    function AuthServerProvider ($http, $localStorage, $sessionStorage, $q) {
        var service = {
            getToken: getToken,
            login: login,
            storeAuthenticationToken: storeAuthenticationToken,
            logout: logout
        };

        return service;

        function getToken () {
            return $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        }

        function login (credentials) {
            var data = {
                email: credentials.email,
                password: credentials.password,
                rememberMe: credentials.rememberMe
            };
            return $http.post('api/login', data).then(authenticateSuccess);

            function authenticateSuccess (data, status, headers) {
                var jwt = data.data.token;
                service.storeAuthenticationToken(jwt, credentials.rememberMe);
                return jwt;
            }
        }

        function storeAuthenticationToken(jwt, rememberMe) {
            if(rememberMe){
                $localStorage.authenticationToken = jwt;
            } else {
                $sessionStorage.authenticationToken = jwt;
            }
        }

        function logout () {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
        }
    }
})();