module.exports = function ($scope, $routeParams, db) {
    db.movie($routeParams.id, function (movie) {
        $scope.movie = movie;
    });

    $scope.back = function () {
        window.history.back();
    };

    $scope.getCount = function (n) {
        return new Array(n);
    }
};
