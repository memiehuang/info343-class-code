angular.module('Movies', [])
    //$http is for ajax requests
    .controller('MoviesController', function($scope, $http) {
        //Set rating values so they can be sorted in this order
        //rather than alphabetically
        var ratingsMap = {
            'Not Rated' : 0,
            'G': 1,
            'PG' : 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        }

        $http.get('data/movies-2014.min.json')
            .then(function(results){
                //map constructs and returns a new array the same size as the original array
                //with elements that consist of whatever the passed in function returns
                $scope.movies = results.data.map(function(movie){
                   movie.ratingOrdinal = ratingsMap[movie.rating];
                   return movie;
               });

                //_ is the lodash equivalent of L or $
                //should return all the unique movie distributors
               $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'))
            });

        $scope.setSort = function(propertyName) {
            if($scope.sortCol === propertyName) {
               $scope.sortReverse = !$scope.sortReverse;
            }
            else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        }
    });