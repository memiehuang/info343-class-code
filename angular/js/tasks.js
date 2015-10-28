/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
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
        }
    });