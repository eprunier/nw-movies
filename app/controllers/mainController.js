module.exports = function ($scope, db, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }

    $scope.getCount = function (n) {
        return new Array(n);
    }
};
