// jQuery
$(function() {
  $('#bgc-select').change(function() {
    var selectedBg = $(this).val();
    $('body').css('background-image', 'url(' + selectedBg + ')');
  });
});
