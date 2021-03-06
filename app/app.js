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
    movies = angular.module('movies', ['ngRoute']);

    /* Controllers */
    movies.controller('mainController', require('./app/controllers/mainController'));
    movies.controller('homeController', require('./app/controllers/homeController'));
    movies.controller('movieController', require('./app/controllers/movieController'));
    movies.controller('editMovieController', require('./app/controllers/editMovieController'));

    /* Routes */
    movies.config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'homeController'
        }).when('/movie/:id', {
            templateUrl: 'app/views/movie.html',
            controller: 'movieController'
        }).when('/edit', {
            templateUrl: 'app/views/editMovie.html',
            controller: 'editMovieController'
        }).when('/edit/:id', {
            templateUrl: 'app/views/editMovie.html',
            controller: 'editMovieController'
        }).otherwise({
            redirectTo: '/'
        });
    });

    /* Services */
    movies.provider('db', require('./app/services/db'));

    /* Configure services */
    movies.config(['dbProvider', function (dbProvider) {
        dbProvider.setDataHome(config.dataHome);
    }]);
}
