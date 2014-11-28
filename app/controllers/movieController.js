module.exports = function ($scope, $routeParams, db) {
    db.movie($scope, $routeParams.id);

    $scope.back = function () {
        window.history.back();
    };

    $scope.getCount = function (n) {
        return new Array(n);
    }
};
