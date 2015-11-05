/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/
//when the DOM content has been loaded
$(function(){
    'use strict';
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn(1000);
    $('#toggle-article').click(function(){
        $('article').fadeToggle();
    });

<<<<<<< HEAD
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    $.getJSON(url).then(function(data) {//asynchronous, will print to console after the data get back, executes methods up until data is back
        console.log(data);
        var temperature = data.main.temp; //accessing data, its main, the its temp
        $('#temp').text(Math.round(temperature));
    });

    console.log('test');
});
=======
//when the DOM content has been loaded
$(function() {
    'use strict';
    //set all the hyperlinks to open in new tabs
    $('a').attr('target', '_blank' );
    //method chaining - every jquery function returns the object the function was called on
    $('article').hide().fadeIn(1000);
    $('#toggle-article').click(function() {
       $('article').toggle();
       //$('article').text("some new value")  --> Would modify the value of the element
    });

    //.then is a callback function, acts like an event listener but responds to data arriving rather than something happening
    //(don't expect the data to return right away - you have to use a callback function)
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    $.getJSON(url)
        .then(function(data) {
            console.log(data);
            //get the temperature from the JSON object
            var temperature = data.main.temp;
            //select the temp span by id, set its text to the rounded temperature
            $('#temp').text(Math.round(temperature))
        });

    //Will appear before the JSON data - the next line will execute before the data comes back from the server
    console.log("test");
});


>>>>>>> 8618b52f1f130b0f8450375e3847289e36947cea
