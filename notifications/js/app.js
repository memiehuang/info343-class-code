/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermission(){
        Notification.requestPermission(function(result){
            if('granted' === result){
                showNotification('Thanks!', 'You will now see my notifications');
            }
        });
    }

    function showNotification(title, body){
        var note = new Notification(title, {body: body, icon: 'http://catbeard.net/wp-content/uploads/2013/05/image65.jpg'});

        //function dismissAlert() {
        //    note.close();
        //}
        //
        //window.setTimeout(dismissAlert, 3000);

        window.setTimeout(note.close.bind(note), 3000);

    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function(){
        switch (Notification) { //acts as an if/else if/else if/else. must put in break to end each case
            case 'granted' :
                showNotification('Hello', 'triggered at' + new Date().toLocaleTimeString());
                break;
            case 'denied':
                alert('Please enable notifications');
                break;
            default:
                askPermission();
        }
    });



});
