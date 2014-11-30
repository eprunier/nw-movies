module.exports = function ($rootScope, $scope, $routeParams, $location, db) {
    db.movie($routeParams.id, function (movie) {
        $scope.movie = movie;
        $rootScope.$digest();
    });

    $scope.getCount = function (n) {
        return new Array(n);
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
