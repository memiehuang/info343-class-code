/*
    script for the index.html file
    look in parse docs javascript guide under destroying objects
    (they prefer promise syntax with .then)
*/

<<<<<<< HEAD
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
=======

//OK to call this before the DOM is ready
Parse.initialize("u8fq2u4IqxKXBa9PuPjHB40HA39gqnxMq8lKJYkG", "R9zpakOjl4dXU3quSQ9tvTwwe0uQA2IJj3GdNKTt");

//when the document is ready...
$(function() {
    'use strict';

    //define a new Task object class with Parse
    var Task = Parse.Object.extend('Task');

    //define a query for querying Task objects
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    //varible to hold the current list of tasks
    var tasks = [];

    //reference to our error message alert
    var errorMessage = $('#error-message');

    //reference to the tasks list element
    var tasksList = $('#tasks-list');

    function displayError(err) {
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
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

<<<<<<< HEAD
    function fetchTasks() {
        showSpinner();
        //calling the find method on tasksQuery is an asynchronous call to the parse server
        //use .then to run function once data has returned
        //takes first function to run if successful, second function to run in case of failure
        //functions aren't passed with parenthesis so they are references to the functions
        tasksQuery.find().then(onData, displayError).always(hideSpinner());
        //.always is like .then, will be called no matter if there was a success or failure
    }

=======
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
<<<<<<< HEAD
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
=======
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title'))
                .appendTo(tasksList);
        });
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find()
            .then(onData, displayError)
            .always(hideSpinner);
    }

    $('#new-task-form').submit(function(evt) {
        //tell the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form 
        //with a name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');
        
        //get the current value
        var title = titleInput.val();

        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
        //so the user can enter the next new task
        task.save()
            .then(fetchTasks, displayError)
            .then(function() {
                titleInput.val('');
            });

        //some browsers also require that we return false to
        //prevent the default behavior
        return false;
    }); //on new task form submit

    //fetch the tasks to kick everything off...
    fetchTasks();

    //refetch the tasks every so often
    //to get new tasks created by others
    window.setInterval(fetchTasks, 10000);
}); //on doc ready
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
