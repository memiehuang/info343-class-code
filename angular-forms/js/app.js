/*
    script file for the index.html page
*/

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list')
    .factory('contacts', function(uuid, localStorageService, storageKey) {
        return [{
            id: 'default-delete-me',
            fname: 'Will',
            lname: 'Burd',
            phone: '206-555-1212',
            dob: '1/9/1993'
        }];
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
    //contacts parameter is equal to the result of the factory function
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })
    .controller('ContactDetailController', function($scope, $stateParams, $state, contacts) {
        //find is called on every element in the array, takes as that parameter that element of the array
        $scope.contact = contacts.find(function(contact) {
            //state params matches the url
            //contact id matches the id in the object
            //function will stop as soon as there is a match
            return contact.id === $stateParams.id;
        })
    })
    .controller('EditContactController', function($scope, $stateParams, $state, contacts) {
        //make a copy, edit the copy, push the copy back on to te original on save
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

        $scope.contact = angular.copy(existingContact);

        $scope.save = function() {
            //first argument is the source, second argument is the destination
            angular.copy($scope.contact, existingContact)
            //pass in a state name to go to
            $state.go('list');
        };
    });