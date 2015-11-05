/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/
<<<<<<< HEAD
$(function() {
    'use strict';
    function createMap(loc, zoom){
        var map = L.map('map').setView(loc, zoom);

=======

$(function() {
    'use strict';

    function createMap(loc, zoom) {
        //L.map creates a new map object, takes id of the div element where the map should show up
        //set view takes and array with two elements: lattitude and longitude,
        // and a number that represents the initial zoom level
        var map = L.map('map').setView(loc, zoom);

        //map tiles - just know this syntax and remember attribution
>>>>>>> 8618b52f1f130b0f8450375e3847289e36947cea
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

<<<<<<< HEAD
        L.circleMarker(loc).addTo(map).bindPopup('<h2>hello<h2>'); //bindpopup accepts html, can add style elements
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    }
    else{
        createMap([47.6097, -122.3331], 12);
    }


=======
        //add a marker to the map - takes lat/long array
        //(circles for this marker are an svg element)
        L.circleMarker(loc).addTo(map).bindPopup('<h2>Hello</h2>');
        //bindPopup adds and html elements in a popup
        //like an image from a traffic camera
    }

    //make sure this browser has the geolocation function
    if(navigator.geolocation) {
        //takes a function to call if successful, and a function to call if there's an error
        //this just has the success funtion
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 15)
        });
    }
    else {
        createMap([47.6097, -122.3332], 12);
    }
>>>>>>> 8618b52f1f130b0f8450375e3847289e36947cea
});