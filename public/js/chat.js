var socket = io();
$(document).ready(function() {
  $('#input-form').submit(function(e) {
    e.preventDefault();
    socket.emit('chat', {text:$('#input').val(), name:name});
    $('#input').val('');
  });
  

  socket.on('chat', function(data) {
    $('#chat').append('<li><span class="name">' + data.name + '</span>' + data.text + '</li>');
    console.log('test');
  });
  
  
});

