
angular.module('escolando')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    const intro = {
      name : 'intro',
      url : '/intro',
      templateUrl : '/views/intro.html',
      controller : 'IntroController'
    };

    const home = {
        name : 'home',
        url : '/',
        templateUrl : '/views/home.html',
        controller : 'HomeController'
    };

    const token_auth = {
      name : 'token-confirmation',
      url : '/token-confirmation',
      templateUrl : '/views/token-confirmation.html',
      controller : 'TokenConfirmationController'
    }

    const register = {
        name : 'groups',
        url : '/groups',
        templateUrl : '/views/groups.html',
        controller : 'GroupsController'
    };

    $stateProvider
        .state(intro)
        .state(home)
        .state(token_auth)
        .state(register);

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

});
