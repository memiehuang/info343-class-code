/*
    script for the index.html file
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
>>>>>>> 0c8149beb4cd5e792f58e96c863714742dec592a
