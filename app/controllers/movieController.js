var common = require('../common');

module.exports = function ($scope, $routeParams, $location, db) {
    db.movie($routeParams.id, function (movie) {
        $scope.$apply(function () {
            $scope.movie = movie;
        });
    });

    $scope.getCount = function (n) {
        return new Array(n);
    }

    $scope.delete = function () {
        db.delete($scope.movie, function (err) {
            if (common.isEmpty(err)) {
                $scope.$apply(function () {
                    $location.path('/');
                });
            } else {
                console.log('Unable to delete movie', err);
            }
        });
    };
};
