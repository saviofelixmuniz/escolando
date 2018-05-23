(function() {
    'use strict';

    angular
        .module('escolando')
        .factory('Auth', Auth);

    Auth.$inject = ['$rootScope', '$state', '$sessionStorage', '$q', 'Principal', 'AuthServerProvider'];

    function Auth ($rootScope, $state, $sessionStorage, $q, Principal, AuthServerProvider) {
        var service = {
            authorize: authorize,
            login: login,
            logout: logout
        };

        return service;

        function authorize (force) {
            var authReturn = Principal.identity(force).then(authThen);

            return authReturn;

            function authThen () {
                var isAuthenticated = Principal.isAuthenticated();

                if (isAuthenticated) {
                    $state.go('home');
                } else {
                    $state.go('login');
                }
            }
        }

        function login (credentials, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            AuthServerProvider.login(credentials)
                .then(loginThen)
                .catch(function (err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

            function loginThen (data) {
                Principal.identity(true).then(function(account) {
                    deferred.resolve(data);
                });
                return cb();
            }

            return deferred.promise;
        }

        function logout () {
            AuthServerProvider.logout();
            Principal.authenticate(null);
        }
    }
})();