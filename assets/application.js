// Put your applicaiton javascript here
$(document).ready(function() {
  console.log('is working!');
  $(document).on('click', '.js-quantity-button', function(event) {
    alert('button confirmed');
  });
});
