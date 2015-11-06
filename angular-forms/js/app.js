/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return localStorageService.get(storageKey) || [];
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/contacts',
                //html partial to be inserted into div when this is the view to show
                templateUrl: 'views/contacts-list.html',
                //controller to use
                controller: 'ContactsController'
            })
            .state('detail', {
                url: '/contacts/:id',
                templateUrl: 'views/contact-detail.html',
                controller: 'ContactDetailController'
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });
        //redirect to this url if some other weird url gets typed in instead
        $urlRouterProvider.otherwise('/contacts');
    })

    //register a directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller){
                controller.$validators.inThePast = function(modelValue){
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })

    //declare
    //contacts parameter is equal to the result of the factory function
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state,  contacts) {
        //find is called on every element in the array, takes as that parameter that element of the array
        $scope.contact = contacts.find(function(contact) {
            //state params matches the url
            //contact id matches the id in the object
            //function will stop as soon as there is a match
            return contact.id === $stateParams.id;
        })
    })
    .controller('EditContactController', function($scope, $stateParams, $state, uuid, localStorageService, storageKey, contacts) {
        //make a copy, edit the copy, push the copy back on to te original on save
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.saveContact = function() {
            if($scope.contact.id){
                angular.copy($scope.contact, existingContact);
            } else{
                $scope.contact.id = uuid.v4();
                contacts.push($scope.contact);
            }

            localStorageService.set(storageKey,contacts);

            //first argument is the source, second argument is the destination
            angular.copy($scope.contact, existingContact);
            //pass in a state name to go to
            $state.go('list');
        };
    });