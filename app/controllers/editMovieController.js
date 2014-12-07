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

    $scope.save = function () {
        db.save($scope.movie, function (err, movies) {
            if (!common.isEmpty(err)) {
                console.log('Unable to add movie:', err);
            } else {
                var movieID;
                if (!common.isEmpty(movies)) {
                    console.log(movies);
                    var movie = movies.pop();
                    movieID = movie._id;
                } else {
                    movieID = $scope.movie._id;
                }

                $scope.$apply(function () {
                    $location.path('/movie/' + movieID);
                });
            }
        });
    }
};
