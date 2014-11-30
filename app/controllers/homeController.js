module.exports = function ($scope, $location, db) {
    $scope.movies = db.movies();

    $scope.displayMovie = function (movie) {
        $location.path('/movie/' + movie._id);
    }
};
