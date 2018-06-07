
angular.module('escolando')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    const login = {
      name : 'login',
      url : '/',
      templateUrl : '/views/login.html',
      controller : 'LoginController'
    };

    const accessdenied = {
      name : 'accessdenied',
      url : '/accessdenied',
      templateUrl : '/views/accessdenied.html'
    };

    const home = {
        name : 'home',
        url : '/home',
        templateUrl : '/views/home.html',
        controller : 'HomeController'
    };

    const token_auth = {
      name : 'token-confirmation',
      url : '/token-confirmation',
      templateUrl : '/views/token-confirmation.html',
      controller : 'TokenConfirmationController'
    };

    const register = {
        name : 'groups',
        url : '/groups',
        templateUrl : '/views/groups.html',
        controller : 'GroupsController'
    };

    const courseCreation = {
        name : 'course-creation',
        url : '/course-creation',
        templateUrl : '/views/course-creation.html',
        controller : 'CourseCreationController'
    };

    $stateProvider
        .state(login)
        .state(accessdenied)
        .state(home)
        .state(token_auth)
        .state(register)
        .state(courseCreation);


    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

});
