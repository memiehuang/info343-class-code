/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
<<<<<<< HEAD
    .constant('tasksKey', 'tasks')
    .controller('TasksController', function($scope, tasksKey){
        'use strict';

        //initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || []; //holds all tasks
        //initialize newTask to an empty object
        $scope.newTask = {}; //new task object

        //creates a local storage to save tasks
        function saveTasks(){
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks))//will encode into JSON string format to save or post on the internet
        }

        //add a function to add newTask to the array
        $scope.addTask = function(){
            //push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            saveTasks();

            //reset newTask to an empty object. clears title property and it automatically clears out title input because its a new object
            $scope.newTask = {};
        };

        //function to toggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
=======
    //takes a name and value for constants
    .constant('tasksKey', 'tasks')
    //"dependency injection" - a function should not create the things, rather the person calling it
    //should pass in the things it needs to work (is good for testing code)
    .controller('TasksController', function($scope, tasksKey) {
        'use strict'

        //if there is something in local storage that is Json for these tasks, use that
        //otherwise set it to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];
        $scope.newTask = {};

        //and a new property to the scope that is a function
        $scope.addTask = function() {
            $scope.tasks.push($scope.newTask);
            $scope.newTask = {};
            saveTasks();
        };

        //function to toggle done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };

        //save data to local storage on the computer
        function saveTasks() {
            //local storage is global variable
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
>>>>>>> 8618b52f1f130b0f8450375e3847289e36947cea
        }
    });