var tingodb = require('tingodb')();
var common = require('../common');

module.exports = function () {
    var collection = {};

    this.setDataHome = function (dataHome) {
        var db = new tingodb.Db(dataHome, {});
        collection = db.collection('movies.db');
    }

    this.$get = function ($rootScope, $q) {
        return {
            movies: function (options) {
                var movies = [];

                try {
                    if (common.isEmpty(options)) {
                        loadRandomMovies($rootScope, $q, collection, movies);
                    } else {
                        findMovies($rootScope, collection, movies, options);
                    }
                } catch (e) {
                    console.log('Unable to find movies', e);
                }

                return movies;
            },
            movie: function (id, callback) {
                loadMovie(collection, id, callback);
            },
            save: function (movie, callback) {
                movie.rating = parseInt(movie.rating);
                collection.save(movie, callback);
            },
            delete: function (movie, callback) {
                collection.remove(movie, callback);
            }
        }
    }
};

/**
* Find movies based on query
*/
function findMovies($rootScope, collection, movies, options) {
    var query = {};

    var filter = options.filter;
    if (common.existy(filter)) {
        query['$or'] = [
        {name: {'$regex': filter, $options: 'i'}},
        {review: {'$regex': filter, $options: 'i'}},
        {genre: {'$regex': filter, $options: 'i'}}
        ];
    }

    collection.find(query).toArray(function (err, moviesList) {
        if (common.isEmpty(err)) {
            if (moviesList) {
                moviesList.forEach(function (movie) {
                    movies.push(movie);
                });
                $rootScope.$digest();
            }
        } else {
            console.log('Unable to find movies', err);
        }
    });
}

function loadRandomMovies($rootScope, $q, collection, movies) {
    collection.count(function (err, moviesCount) {
        var promised = [];

        var selectedIndexes = generateSelection(moviesCount);
        for (i in selectedIndexes) {
            var promise = loadMovieByIndex($q, collection, selectedIndexes[i]);
            promised.push(promise);
        }

        $q.all(promised).then(function (result) {
            result.forEach(function (movie) {
                movies.push(movie);
            });
        }, function (reason) {
            return $q.reject(reason);
        });
    });
}

function generateSelection(moviesCount) {
    var selected = [];

    var nbSelection = Math.min(6, moviesCount);
    for (i = 0; i < nbSelection; i++) {
        var next = Math.floor(Math.random() * moviesCount);
        while (selected.indexOf(next) > -1) {
            next = Math.floor(Math.random() * moviesCount);
        }
        selected.push(next);
    }

    return selected;
}

function loadMovieByIndex ($q, collection, selectedIndex) {
    return $q(function (resolve, reject) {
        collection.findOne(
            {},
            {skip: selectedIndex},
            function (err, movie) {
                if (common.isEmpty(err)) {
                    resolve(movie);
                } else {
                    reject('Unable to load random movie' + err);
                }
            }
        );
    });
}

function loadMovie(collection, id, callback) {
    collection.findOne({'_id': id}, function (err, movie) {
        if (common.isEmpty(err)) {
            callback(movie || {});
        } else {
            console.log('Unable to get movie', err);
        }
    });
}
