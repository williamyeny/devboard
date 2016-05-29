var name = 'anonymous' + parseInt(Math.random()*9000 + 1000);

$(document).ready(function() {
  console.log('name: ' + name);
  $('#submit-name').click(function() {
    $('#modal-bg').css('display', 'none');
    name = $('#name').val();
  });
});