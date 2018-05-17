/**
 * @author Sávio Muniz
 */

angular.module('escolando').config(function($stateProvider,$urlRouterProvider, $locationProvider) {
    const home = {
        name : 'home',
        url : '/',
        templateUrl : '/views/home.html',
        controller : 'HomeCtrl'
    };

    const register = {
        name : 'groups',
        url : '/groups',
        templateUrl : '/views/groups.html',
        controller : 'GroupsCtrl'
    };

    $stateProvider
        .state(home)
        .state(register);

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

});