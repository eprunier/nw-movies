movies.controller("movieController", function ($scope, $routeParams) {
    $scope.getMovieById($routeParams.id);
});
