var config = configure();
init(config);

function configure() {
    var fs = require('fs');
    var userHome = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var moviesHome = userHome + '/.nw-movies';
    fs.mkdir(moviesHome, function () {});

    return {
        home: moviesHome
    };
}

function init(config) {
    movies = angular.module('movies', ['ngResource', 'ngRoute']);

    /* Controllers */
    movies.controller('mainController', require('./app/controllers/mainController'));
    movies.controller('homeController', require('./app/controllers/homeController'));
    movies.controller('movieController', require('./app/controllers/movieController'));
    movies.controller('addMovieController', require('./app/controllers/addMovieController'));

    /* Routes */
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

    /* Services */
    movies.provider('db', require('./app/services/db'));

    movies.config(['dbProvider', function (dbProvider) {
        dbProvider.setHome(config.home);
    }]);
}
