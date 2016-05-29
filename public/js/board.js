//var path;
var paths = {};
var mode = 'brush';
var lPoint;
var l;
var color = 'black';

function onMouseDown(event) {
//  path = new Path();
  socket.emit('down', {mode:mode, color:color});
  socket.emit('drag', event.point);
//  path.strokeColor = 'black';
  lPoint = event.point;
}

function onMouseDrag(event) {
  
//  path.add(event.point);
  if (mode == 'brush' || mode == 'eraser') {
    socket.emit('drag', event.point);
  }
}

function onMouseUp(event) {
  if (mode == 'line') {
    socket.emit('drag', event.point);
  }
  socket.emit('up');
}

socket.on('down', function(data) {
  id = data.id
  paths[id] = new Path();
  console.log('data: ' + data.id);
  if (data.mode == 'brush' || data.mode == 'line') {
    paths[id].strokeColor = data.color;
    console.log('color: ' + data.color);
  } else {
    paths[id].strokeColor = 'white';
    paths[id].strokeWidth = 15;
  }
  
  console.log('YEAFA');
});

socket.on('up', function(data) {
  console.log('up');
  delete paths[data];
});

socket.on('drag', function(data) {
  console.log(data.point[1] + " " + data.point[2]);
  paths[data.id].add(new Point(data.point[1], data.point[2]));
  view.draw();
})

$(document).ready(function() {
  
  $('#brush').css('border-color', '#333333');
  $('#brush').css('background-color', '#dddddd');
  $('#brush').css('cursor', 'auto');
  $('#black').css('border-color', '#333333');
  $('#black').css('cursor', 'auto');
  
  $('.color').click(function() {
    $('.color').css('border-color', '#cccccc');
    $('.color').css('cursor', 'pointer');
    $(this).css('border-color', '#333333');
    $(this).css('cursor', 'auto');
    
    color = $(this).css('background-color');
    console.log(color);
  });
  
  $('.mode').click(function() {
    $('.mode').css('border-color', '#cccccc');
    $('.mode').css('background-color', '#ffffff');
    $('.mode').css('cursor', 'pointer');
    $(this).css('border-color', '#333333');
    $(this).css('background-color', '#dddddd');
    $(this).css('cursor', 'auto');
    if ($(this).attr('id') == 'brush') {
      mode = 'brush';
    } else if ($(this).attr('id') == 'line') {
      mode = 'line';
    } else {
      mode = 'eraser';
    }
    console.log('mode: ' + mode);
  });
});
