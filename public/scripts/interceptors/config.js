(function() {
    'use strict';

    angular
        .module('escolando')
        .config(httpConfig);

    httpConfig.$inject = ['$httpProvider'];

    function httpConfig($httpProvider) {
        $httpProvider.interceptors.push('authExpiredInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
    }
})();