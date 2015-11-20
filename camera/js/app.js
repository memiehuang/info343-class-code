
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //navigator is a universal object. Grabs whatever each vendor uses to get user media
    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var input = document.getElementById("line-color-inp");
    var snapshot = document.querySelector('img');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mouseDown = false;

    navigator.getUserMedia({video: true}, function(stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);

    }, function(err){ //user denies access to webcam or the device doesnt have webcam
        console.error(err);
    });

    video.addEventListener('click', function(){
        if(videoStream){
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
        }
    });

    canvas.addEventListener('mousedown', function(mouse){
        mouseDown = true;
        var x  = mouse.clientX - canvas.offsetLeft;
        var y =  mouse.clientY - canvas.offsetTop + window.scrollY;
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(x, y);
    });

    canvas.addEventListener('mousemove', function(mouse){
        var x  = mouse.clientX - canvas.offsetLeft;
        var y =  mouse.clientY - canvas.offsetTop + window.scrollY;
        if(mouseDown){
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function(mouse){
        var x  = mouse.clientX - canvas.offsetLeft;
        var y =  mouse.clientY - canvas.offsetTop + window.scrollY;
        ctx.lineTo(x, y);
        ctx.stroke();
        mouseDown = false;
    });

    input.addEventListener('change', function(){
        ctx.strokeStyle = document.getElementById('line-color-inp').value;
    });

    document.querySelector('#btnSnapshot').addEventListener('click', function(){
        snapshot.src = canvas.toDataURL();
    });

});

