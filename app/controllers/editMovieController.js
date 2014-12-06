var common = require('../common');

module.exports = function ($rootScope, $scope, $routeParams, $location, db) {
    var movieID = $routeParams.id;
    if (common.existy(movieID)) {
        db.movie(movieID, function (movie) {
            $scope.$apply(function () {
                $scope.movie = movie;
            });
        });
    } else {
        $scope.movie = {};
    }

    $scope.add = function (newMovie) {
        db.add(newMovie, function (err, movies) {
            if (err !== null) {
                console.log('Unable to add movie:', err);
            } else {
                var movie = movies.pop();
                $scope.$apply(function () {
                    $location.path('/movie/' + movie._id);
                });
            }
        });
    }
};
