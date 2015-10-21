/*
    script for the index.html file
*/
Parse.initialize("dEKWVy38oOPPkvwxrULl6xmgrqPNJx31TKtPHvrc", "eXJzvXHoAZIg3bF1lEPvSlyeKd4MkmBgbMtdgvvO");

$(function(){
    'use strict';

    //new Task class for Parse
    var Task = Parse.Object.extend('Task'); //acts kind of like a class object in Java, think of it like a table name in DB's
    //new Query that will return all tasks ordered by createdAt
    var tasksQuery = new Parse.Query(Task); //gets to look at multiple things at the same time
    tasksQuery.ascending('createdAt');

    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference ot the error message alert
    var errorMessage = $('#error-message'); //selecting the element with Id error message

    //current set of tasks
    var tasks = [];

    function displayError(err){
        errorMessage.text(err.meesage); //put message in
        errorMessage.fadeIn(); //fade in when avaialble
    }

    function clearError(){
        errorMessage.hide();
    }

    function showSpinner(){
        $('.fa-spin').show();
    }

    function hideSpinner(){
        $('.fa-spin').hide();
    }

    function fetchTasks(){
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner); //hides spinner when the data comes back
    }

    function onData(results){
        tasks = results;
        renderTasks();
    }

    function renderTasks(){
        console.log('Called');
        tasksList.empty();
        tasks.forEach(function(task){
            $(document.createElement('li')) //lets us use jQuery method chaining
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    //when the user submits the new task form...
    $('#new-task-form').submit(function(evt){
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save().then(fetchTasks, displayError).then(function(){
            titleInput.val('');
        });

        return false;
    });

    //go and fetch tasks from the server
    fetchTasks();

    //window.setInterval(fetchTasks, 3000); //queries the server and refreshes the task list
});