// Put your applicaiton javascript here
$(document).ready(function () {
  $(document).on('click', '.js-quantity-button', function (event) {
    // Targeting elements
    let $button = $(this);
    let $form = $button.closest('form');
    let $quantity = $form.find('.js-quantity-field');
    let quantityValue = parseInt($quantity.val());
    let max = $quantity.attr('max') ? parseInt($quantity.attr('max')) : null;

    if ($button.hasClass('plus')) {
      // do something for plus click
      $quantity.val(quantityValue + 1);
    } else if ($button.hasClass('minus')) {
      // do something for minus click
      $quantity.val(quantityValue - 1);
    }
  });
});
