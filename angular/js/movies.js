//add the name of the ui router angular module to the list of dependencies
angular.module('Movies', ['ui.router'])
    .factory('moviesJSON', function($http){
        return $http.get('data/movies-2014.min.json')
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
               url: '/movies',
               templateUrl: 'views/movies-list.html',
               controller: 'MoviesController'
            })
            .state('detail', {
                url: '/movies/:index',
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'
            });
        $urlRouterProvider.otherwise('/movies');
    })
    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(results) {
           $scope.movie = results.data[$stateParams.index];
        });
    })
    .controller('MoviesController', function($scope, moviesJSON) {
        //parameter for the controller must match the name of the factor exactly
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

        moviesJSON.then(function(results){
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