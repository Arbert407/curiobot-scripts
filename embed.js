var chatterbotUrl = 'https://curiobotunah.herokuapp.com/api/chatterbot/';

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
      xhr.setRequestHeader('accept', 'application/json, text-plain, /');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }
});

var $chatlog = $('.js-chat-log');
var $input = $('.js-text');
var $sayButton = $('.js-say');

function createRow(text) {
  var $row = $('<li class="list-group-item"></li>');

  $row.html(text);
  $chatlog.append($row);
  $(".btn-info").html('Enviar');

}

function submitInput() {
  var inputData = {
    'text': $input.val(),
    'topics': embed_topics,
  }

  createRow(inputData.text);

  var $submit = $.ajax({
    type: 'POST',
    crossDomain: true,
    cors: true,
  dataType: 'json',
    url: chatterbotUrl,
    data: JSON.stringify(inputData),
  });

  $submit.done(function(statement) {
      createRow(statement.text);
      $input.val('');
      $chatlog[0].scrollTop = $chatlog[0].scrollHeight;
  });

  $submit.fail(function() {
    console.log("Error");
  });
}

$sayButton.click(function() {
  submitInput();
  $( ".btn-info" ).blur();
  $(".btn-info").html('Cargando...');
});

$input.keydown(function(event) {
  if (event.keyCode == 13) {
    submitInput();
    $( ".btn-info" ).blur();
    $(".btn-info").html('Cargando...');
  }
});