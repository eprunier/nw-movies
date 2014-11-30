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
    }).when('/add', {
        templateUrl: 'app/views/addMovie.html',
        controller: 'addMovieController'
    }).otherwise({
        redirectTo: '/'
    });
});

/* Controllers */
movies.controller('mainController', require('./app/controllers/mainController'));
movies.controller('homeController', require('./app/controllers/homeController'));
movies.controller('movieController', require('./app/controllers/movieController'));
movies.controller('addMovieController', require('./app/controllers/addMovieController'));

/* Services */
movies.factory('db', require('./app/services/db'));
