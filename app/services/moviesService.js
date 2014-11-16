movies.factory('moviesService', function ($resource) {
  return $resource('http://moviestub.cloudno.de/movies')
});
