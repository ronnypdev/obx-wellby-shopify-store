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
      $quantity.val(quantityValue + 1).change();
    } else if ($button.hasClass('minus')) {
      // do something for minus click
      $quantity.val(quantityValue - 1).change();
    }
  });

  $(document).on('change', '.js-quantity-field', function (event) {
    let $field = $(this);
    let $form = $field.closest('form');
    let $quantityText = $form.find('.js-quantity-text');
    let shouldDisableMinus = parseInt(this.value) === 1;
    let $minusButton = $form.find('.js-quantity-button.minus');

    $quantityText.text(this.value);

    if (shouldDisableMinus) {
      $minusButton.prop('disabled', true);
    } else if ($minusButton.prop('disabled') === true) {
      $minusButton.prop('disabled', false);
    }
  });
});
