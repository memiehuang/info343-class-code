/*
    script for the index.html file
    look in parse docs javascript guide under destroying objects
    (they prefer promise syntax with .then)
*/
<<<<<<< HEAD
Parse.initialize("dEKWVy38oOPPkvwxrULl6xmgrqPNJx31TKtPHvrc", "eXJzvXHoAZIg3bF1lEPvSlyeKd4MkmBgbMtdgvvO");

$(function(){
    'use strict';

    //new Task class for Parse
    var Task = Parse.Object.extend('Task'); //acts kind of like a class object in Java, think of it like a table name in DB's
    //new Query that will return all tasks ordered by createdAt
    var tasksQuery = new Parse.Query(Task); //gets to look at multiple things at the same time
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    //reference to the task list element
    var tasksList = $('#tasks-list');

    //reference to our rating element
    var ratingElem = $('#rating');

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
=======

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
>>>>>>> 0c8149beb4cd5e792f58e96c863714742dec592a
        tasks = results;
        renderTasks();
    }

<<<<<<< HEAD
    function renderTasks(){
        console.log('Called');
        tasksList.empty();
        tasks.forEach(function(task){
            var li = $(document.createElement('li')) //lets us use jQuery method chaining
                .text(task.get('title'))

                //? is a ternary expression: like if/then expression.
                //task.get('done') is the if condition, 'completed-task' is the then conidtion, : is the else condition
                .addClass(task.get('done') ? 'completed-task' : '')

                .appendTo(tasksList)
                .click(function(){
                    task.set('done', !task.get('done')); //toggle the value of the done property
                    task.save().then(renderTasks(), displayError); //want to renderTasks to set the style to show that this task is done
                });
            $(document.createElement('span'))
                .raty({readOnly: true,
                    score: (task.get('rating') || 0), //evaluate the first part of expression, if the result is falsey (undefined), then I want you to use what's on the right side
                    hints: ['crap', 'awful', 'ok', 'great', 'awesome']}) //sets what the words are when you hover over the stars
                .appendTo(li);
        });
    }

    function showMessage(message){
        message = message || 'Hello'; //if there is a message, it will alert the message, but if there isn't it will default to Hello
        alert(message);
    }

    //when the user submits the new task form...
    $('#new-task-form').submit(function(evt){
        //tells the browser not to do its default behavior
        evt.preventDefault();

        //find the input element in this form
        //weith a name attribute set to "title
        var titleInput = $(this).find('[name="title"]');

        //get the current value
        var title = titleInput.val();
        //create a new Task and set the title
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));
=======
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
>>>>>>> 0c8149beb4cd5e792f58e96c863714742dec592a

        //save the new task to your Parse database
        //if save is successful, fetch the tasks again
        //otherwise display the error
        //regardless, clear the title input
<<<<<<< HEAD
        //so we can add another
        task.save().then(fetchTasks, displayError).then(function(){
            titleInput.val('');
            ratingElem.raty('set', true); //reset the stars after task has been added
        });

        return false;
    });

    //go and fetch tasks from the server
    fetchTasks();

    //enable the rating user interface element
    ratingElem.raty(); //adds the rating

    //window.setInterval(fetchTasks, 3000); //queries the server and refreshes the task list


});
=======
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
<<<<<<< HEAD
>>>>>>> 0c8149beb4cd5e792f58e96c863714742dec592a
=======
>>>>>>> 0e1f3c03a332ce37c172bdee43ad742a11ba4994
>>>>>>> 8618b52f1f130b0f8450375e3847289e36947cea
