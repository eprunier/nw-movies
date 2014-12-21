var common = require('../common');

module.exports = function ($scope, $location, db) {
    $scope.movies = db.movies();

    $scope.displayMovie = function (movie) {
        $location.path('/movie/' + movie._id);
    }

    $scope.findMovies = function () {
        var options = {};

        var search = $scope.search;
        if (search) {
            options.filter = search;
        }

        $scope.movies = db.movies(options);
    }
};
