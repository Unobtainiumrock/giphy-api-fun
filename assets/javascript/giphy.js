
$(document).ready(function() {
  // console.log('hello world!');
  // var newDiv
  var newButton = $('<p>Hello World!</p>');
  console.log(newButton);
  $('#button-holder').append($(`<button type="button" class="btn btn-dark">Hello world!</button>`));
})