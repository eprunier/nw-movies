movies = angular.module('movies', ['ngResource', 'ngRoute']);

/* Router */
movies.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'homeController'
    }).when('/movie/:id', {
        templateUrl: 'app/views/movie.html',
        controller: 'movieController'
    }).otherwise({
        redirectTo: '/'
    });
});

/* Controllers */
movies.controller('homeController', require('./app/controllers/homeController'));
movies.controller('movieController', require('./app/controllers/movieController'));

/* Services */
movies.factory('db', require('./app/services/db'));
