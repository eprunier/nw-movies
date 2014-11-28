module.exports = function ($scope, db, $location) {
    $scope.movies = db.movies();
};
