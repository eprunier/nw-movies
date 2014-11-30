module.exports = function ($scope, db, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
};
