
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


    const announcement = {
        name: 'announcement',
        url: '/announcements',
        templateUrl: '/views/announcements.html',
        controller: 'AnnouncementsController'
    };

    const profile = {
        name : 'profile',
        url : '/profile',
        templateUrl : '/views/profile.html',
        controller : 'ProfileController'
    };

    const mark = {
      name : 'marks',
      url : '/marks',
      templateUrl : '/views/marks.html',
      controller : 'MarksController'
    };

    const activity = {
      name : 'activities',
      url : '/activities',
      templateUrl : '/views/activities.html',
      controller : 'ActivityController'
    };

    const attendance = {
      name : 'attendance',
      url : '/attendance',
      templateUrl : '/views/attendance.html',
      controller : 'AttendanceController'
    };

    const subjects = {
      name : 'subjects',
      url : '/subjects',
      templateUrl : '/views/subjects.html',
      controller : 'SubjectsController'
    };

    const teachers = {
      name : 'teachers',
      url : '/teachers',
      templateUrl : '/views/teachers.html',
      controller : 'TeachersController'
    };

    $stateProvider
        .state(login)
        .state(accessdenied)
        .state(home)
        .state(token_auth)
        .state(register)
        .state(courseCreation)
        .state(announcement)
        .state(profile)
        .state(mark)
        .state(activity)
        .state(attendance)
        .state(subjects)
        .state(teachers);

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);

});
