$(document).ready(function() {
  $('textarea').on("input", function() {
    const counter = $(this).next().children(".counter");
    const length = $(this).val().length;
    const maxWord = '10';
    const count = maxWord - length;
    $(counter).val(count);

    if (count < 0) {
      $('#counter').css('color', 'red');
    } else {
      $('#counter').css('color', 'black');
    }
  });
});