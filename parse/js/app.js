/*
    script for the index.html file
    look in parse docs javascript guide under destroying objects
    (they prefer promise syntax with .then)
*/

//identifies the application - can go outside the document ready function
//these are the application key and the javascript key (can be accessed under settings)
Parse.initialize("mYTXJJajodOwHTTpnU6OXtSJth2IWYWxEcepOO1U", "n4G4QQmtaDJZRdqzAYZUKuWjLlv4a9gdanQb2nUC");

$(function() {
    'use strict';

    //Creates a parse class in the server
    //takes the "table name" of the data
    //(which is this class)
    var Task = Parse.Object.extend('Task');
    //is a function that creates a new parse query object
    //(acts like a constructor)
    //returns all tasks
    var tasksQuery = new Parse.Query(Task);
    //sorts by the time they were created
    //(orders the query)
    tasksQuery.ascending('createdAt');
    //is like a SQL where clause
    tasksQuery.notEqualTo('done', true);

    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference to our rating element
    var ratingElem = $('#rating');

    //reference to the error message alert
    var errorMessage = $('#error-message');

    //current set of tasks
    var tasks = [];

    function displayError(err) {
        //use .text to avoid script injection attacks
        //using .html could allow user to type in text that is html
        //(and do bad things)
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        //calling the find method on tasksQuery is an asynchronous call to the parse server
        //use .then to run function once data has returned
        //takes first function to run if successful, second function to run in case of failure
        //functions aren't passed with parenthesis so they are references to the functions
        tasksQuery.find().then(onData, displayError).always(hideSpinner());
        //.always is like .then, will be called no matter if there was a success or failure
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        //clear out list so adding new tasks doesn't duplicate previously added tasks
        tasksList.empty();
        tasks.forEach(function(task) {
          var li =  $(document.createElement('li'))
               .text(task.get('title'))
               //terinary operator adds "completed-task" class to task if the task is done
               .addClass(task.get('done') ? 'completed-task' : '')
               .appendTo(tasksList)
               //toggles done property on click
               //you have access to all variables and parameters declared in the containing function
               .click(function() {
                   //just set and save data to update it
                   task.set('done', !task.get('done'));
                   task.save().then(renderTasks, displayError);
                });
            //adds read-only rating star display next to tasks
            $(document.createElement('span'))
              //raty takes options as a javascript object
              .raty({readOnly: true,
                    //if the result of the first expression is "falsy" then use the right value
                    //undefined will coerce to false; this allows handling of undefined case
                    //also good for setting default argument values
                    score: (task.get('#rating') || 1),
                    hints: ['crap', 'awful', 'ok', 'nice', 'awesome']})
              .appendTo(li);
        });
    }

    //when the user submits the new task form...
    //is passed event object
    //use both prevent default and return false so it works in all browsers
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();
        //input controls don't need ids they can be refered to by their name
        //attirbute selectory syntax, can also be used in css
        var titleInput = $(this).find('[name = "title"]');
        var title = titleInput.val();
        var task = new Task();
        //set the title property of the new task equal to the title that was typed into the input box
        task.set('title', title);
        task.set('rating', $('#rating').raty('score'));
                                                //clear task box after saving it (chains .thens)
        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            //reset number of stars
            ratingElem.raty('set', {});
        });

        return false;
    });

    //go and fetch tasks from the server
    fetchTasks();

    //enable rating user interface
    ratingElem.raty();

    //refers to browser interval
    //set interval calls this function every number of milliseconds that its passed in
    //window.setInterval(fetchTasks, 3000);
});