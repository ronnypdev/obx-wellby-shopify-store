// Put your applicaiton javascript here
$(document).ready(function () {
  let onQuantityButtonClick = function (event) {
    // Targeting elements
    let $button = $(this);
    let $form = $button.closest('form');
    let $quantity = $form.find('.js-quantity-field');
    let quantityValue = parseInt($quantity.val());
    let max = $quantity.attr('max') ? parseInt($quantity.attr('max')) : null;

    if (
      $button.hasClass('plus') &&
      (max === null || quantityValue + 1 <= max)
    ) {
      // do something for plus click
      $quantity.val(quantityValue + 1).change();
    } else if ($button.hasClass('minus')) {
      // do something for minus click
      $quantity.val(quantityValue - 1).change();
    }
  };

  let onQuantityFieldChange = function (event) {
    let $field = $(this);
    let $form = $field.closest('form');
    let $quantityText = $form.find('.js-quantity-text');
    let shouldDisableMinus = parseInt(this.value) === 1;
    let shouldDisablePlus =
      parseInt(this.value) === parseInt($field.attr('max'));
    let $minusButton = $form.find('.js-quantity-button.minus');
    let $plusButton = $form.find('.js-quantity-button.plus');

    $quantityText.text(this.value);

    if (shouldDisableMinus) {
      $minusButton.prop('disabled', true);
    } else if ($minusButton.prop('disabled') === true) {
      $minusButton.prop('disabled', false);
    }

    if (shouldDisablePlus) {
      $plusButton.prop('disabled', true);
    } else if ($plusButton.prop('disabled') === true) {
      $plusButton.prop('disabled', false);
    }
  };

  let onVariantRadioChange = function (event) {
    let $ratio = $(this);
    let $form = $ratio.closest('form');
    let max = $ratio.attr('data-inventory-quantity');
    let $quantity = $form.find('.js-quantity-field');
    let $addToCartButton = $form.find('#add-to-cart-button');

    if ($addToCartButton.prop('disabled') === true) {
      $addToCartButton.prop('disabled', false);
    }

    $quantity.attr('max', max);

    if (parseInt($quantity.val()) > max) {
      $quantity.val(max).change();
    }
  };

  let onAddtoCart = function (event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: $(this).serialize(),
      success: onCartUpdated,
      error: onError
    });
  };

  let onLineRemoved = function (event) {
    event.preventDefault();
    let $removeLink = $(this);
    let $removeQuery = $removeLink.attr('href').split('change?')[1];
    $.post('/cart/change.js', $removeQuery, onCartUpdated, 'json');
  };

  let onCartUpdated = function () {
    $.ajax({
      type: 'GET',
      url: '/cart',
      context: document.body,
      success: function (context) {
        let $dataCartContents = $(context).find('.js-cart-page-contents');
        let dataCartHtml = $dataCartContents.html();
        let dataCartItemCount = $dataCartContents.attr('data-cart-item-count');
        let $miniCartContents = $('.js-mini-cart-contents');
        let $cartItemCount = $('.js-cart-item-count');

        $cartItemCount.text(dataCartItemCount);
        $miniCartContents.html(dataCartHtml);

        if (parseInt(dataCartItemCount) > 0) {
          openCart();
        } else {
          closeCart();
        }
      }
    });
  };

  let onError = function (XMLHttpRequest, textStatus) {
    let data = XMLHttpRequest.responseJSON;
    alert(data.status + ' - ' + data.message + ': ' + data.description);
  };

  let openCart = function () {
    $('html').addClass('mini-cart-open');
  };

  let closeCart = function () {
    $('html').removeClass('mini-cart-open');
  };

  let onCartButtonClick = function (event) {
    event.preventDefault();

    let isCartOpen = $('html').hasClass('mini-cart-open');

    if (!isCartOpen) {
      openCart();
    } else {
      closeCart();
    }
  };

  $(document).on('click', '.js-quantity-button', onQuantityButtonClick);

  $(document).on('change', '.js-quantity-field', onQuantityFieldChange);

  $(document).on('change', '.js-variant-radio', onVariantRadioChange);

  $(document).on('submit', '#add-to-cart-form', onAddtoCart);

  $(document).on('click', '#mini-cart .js-remove-line', onLineRemoved);

  $(document).on(
    'click',
    '.js-cart-link, #mini-cart .js-keep-shopping',
    onCartButtonClick
  );
});
