module.exports = function ($rootScope, $scope, $location, db) {
    $scope.movie = {};

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
