var mkdirp = require('mkdirp');

var config = configure();
init(config);

function configure() {
    var userHome = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    var dataHome = process.env.XDG_DATA_HOME || userHome + '/.local/share';
    var moviesDataHome = dataHome + '/nw-movies';
    mkdirp.sync(moviesDataHome, function (err) {
        if (err) {
            console.log('Error while creating data directory', err);
        }
    });

    return {
        dataHome: moviesDataHome
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
    // movies.factory('common', require('./app/services/common'));
    movies.provider('db', require('./app/services/db'));

    /* Configure services */
    movies.config(['dbProvider', function (dbProvider) {
        dbProvider.setDataHome(config.dataHome);
    }]);
}
