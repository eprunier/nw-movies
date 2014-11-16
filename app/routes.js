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
