/*
 script file for the index.html page
 */

angular.module('ContactsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
<<<<<<< HEAD
    //declare a constant for our local storage key
    .constant('storageKey', 'contacts-list')

    //declare a factory that will return our array of contacts
    //this factory function will be called only once, but the return
    //value of this function can be injected into multiple controllers
    .factory('contacts', function(localStorageService, storageKey) {
        return localStorageService.get(storageKey) || [];
    })

    //declare a module configuration function that configures our local UI states
    .config(function($stateProvider, $urlRouterProvider) {
        //declare three UI 'states': one for the list view, one for detail, and one for editing
        $stateProvider
            .state('list', {
                url: '/contacts',                           //the local URL for this state (#/contacts)
                templateUrl: 'views/contacts-list.html',    //file to get the HTML from
                controller: 'ContactsController'            //Angular controller to use when this view is active
            })
            .state('detail', {
                url: '/contacts/:id',                       //the :id means it can be any id value
                templateUrl: 'views/contact-detail.html',   //and we want access to that value in the
                controller: 'ContactDetailController'       //$stateParams object injected into the controller
            })
            .state('edit', {
                url: '/contacts/:id/edit',
                templateUrl: 'views/edit-contact.html',
                controller: 'EditContactController'
            });

        //if the local URL doesn't match one of those declared above,
        //reset it to #/contacts
        $urlRouterProvider.otherwise('/contacts');
    })

=======
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

>>>>>>> 279c16882cc8b7fdff3f25bb28008df9229a362a
    //register a directive for custom validation of dates in the past
    .directive('inThePast', function() {
        return {
            require: 'ngModel',
<<<<<<< HEAD
            link: function(scope, elem, attrs, controller) {
                controller.$validators.inThePast = function(modelValue) {
=======
            link: function(scope, elem, attrs, controller){
                controller.$validators.inThePast = function(modelValue){
>>>>>>> 279c16882cc8b7fdff3f25bb28008df9229a362a
                    var today = new Date();
                    return (new Date(modelValue) <= today);
                }
            }
        };
    })

<<<<<<< HEAD
    //declare the controller for the contacts list view
    //ask Angular to inject the return value of the `contacts` factory
    .controller('ContactsController', function($scope, contacts) {
        $scope.contacts = contacts;
    })

    //declare our controller for the contact detail view
    //again ask Angular to inject the return value from the `contacts` factory
    //so that we have access to the same data model
    .controller('ContactDetailController', function($scope, $stateParams, contacts) {
        //the $stateParams object will contain a property for every URL token
        //declared in the `url` configuration property for this UI state
        //in our case, there is only one, with the name `id`
        //we use that to find the particular contact we want to show
        $scope.contact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

    })

    //declare a controller for the edit contact view
    .controller('EditContactController', function($scope, $stateParams, $state,
                                                  uuid, localStorageService, storageKey, contacts) {
        //just as in the ContactDetailController, the $stateParams object will contain an
        //`id` property set to the ID on the local URL
        //we use this to find the particular contact the user wants to edit
=======
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
>>>>>>> 279c16882cc8b7fdff3f25bb28008df9229a362a
        var existingContact = contacts.find(function(contact) {
            return contact.id === $stateParams.id;
        });

<<<<<<< HEAD
        //make a copy of the contact for editing
        //this allows the user to cancel without saving any changes
        $scope.contact = angular.copy(existingContact);

        //add a saveContact() method to the $scope so that our view
        //can call it when the form is submitted
        //the view settings will prohibit the user from submitting
        //the form with invalid data
        $scope.saveContact = function() {
            if ($scope.contact.id) {
                //copy our edits back to the original contact
                angular.copy($scope.contact, existingContact);
            }
            else {
                //create and assign a new UUID
                $scope.contact.id = uuid.v4();

                //push the new contact into the contacts array
                contacts.push($scope.contact);
            }

            //save contacts to local storage
            localStorageService.set(storageKey, contacts);

            //use $state to go back to the list view
=======
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
>>>>>>> 279c16882cc8b7fdff3f25bb28008df9229a362a
            $state.go('list');
        };
    });