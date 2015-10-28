/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
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
        }
    });