module.exports = function ($rootScope, $scope, $routeParams, $location, db) {
    db.movie($routeParams.id, function (movie) {
        $scope.$apply(function () {
            $scope.movie = movie;
        });
    });

    $scope.getCount = function (n) {
        return new Array(n);
    }

    $scope.edit = function () {
        $location.path('/edit/' + $scope.movie._id);
    }

    $scope.delete = function () {
        db.delete($scope.movie, function (err) {
            if (!err) {
                $scope.$apply(function () {
                    $location.path('/');
                });
            }
        });
    };
};
