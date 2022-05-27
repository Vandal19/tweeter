$(document).ready(function() {
  /* Function to countdown the number of Char */
  $('textarea').on("input", function () {
    const counter = $(this).next().children(".counter");
    const length = $(this).val().length;
    const maxWord = '140';
    const count = maxWord - length;
    $(counter).val(count);

    if (count < 0) {
      $('#counter').css('color', 'red');
    } else {
      $('#counter').css('color', 'black');
    }
  });

  /* Function to add a 2nd toggle button that will scrollToTop once the user click on it*/
  $(document).scroll(function() {
    $(".scroll-page").show();
  })
  $(".fa-circle-arrow-up").click(function() {
    $(document).scrollTop(0,0);
  });
});

