/**
 * @file
 * Global utilities.
 *
 */

(function ($, Drupal) {

  'use strict';

  Drupal.webform = Drupal.webform || {};
  Drupal.webform.intlTelInput = Drupal.webform.intlTelInput || {};
  Drupal.webform.intlTelInput.options = Drupal.webform.intlTelInput.options || {};
  Drupal.webform.select2 = Drupal.webform.select2 || {};
  Drupal.flexslider = Drupal.flexslider || {};
  Drupal.moment = Drupal.moment || {};

  Drupal.behaviors.houseinrwanda_theme = {
    attach: function (context, settings) {

      const main = 'mainBehavior';

      $(content).find('img').addClass('rounded');

      $(context).find('input.form-tel').once(main).each(function () {
        $(this).intlTelInput({initialCountry: 'rw', nationalMode: false});
      });

      if (settings.bid !== undefined) {
        const expirationDate = moment.tz(settings.bid.expiration, "UCT");
        $('#countdown').countdown(expirationDate.toDate(), function (event) {
          $(this).html(event.strftime('%D day%!D %H:%M:%S')).addClass('text-danger').css('font-weight', 'bold');
        }).on('finish.countdown', function () {
          $(this).html("Closed").addClass('text-danger').css('font-weight', 'bold');
        });
      }

      $(context).find('select#edit-field-pr-property-type-value').once(main).select2({
        theme: 'bootstrap-5',
        placeholder: 'Select property type',
        width: '100%'
      });

      $(context).find('select#edit-field-pr-request-type-value').once(main).select2({
        theme: 'bootstrap-5',
        minimumResultsForSearch: Infinity,
        width: '100%'
      });

      const mainNavbar = $(context).find('nav#navbar-main');
      if (settings.toolbar !== undefined) {
        mainNavbar.css('top', '79px');
      }
      $(context).find('div.grand-wrapper').css('margin-top', mainNavbar.height());

      $(context).find('input#edit-field-advert-locality').removeClass('form-control'); //To hide shs input field
      // $(context).find('input#edit-subscription-active').removeClass('form-control');

      const priceField = $(context).find('input#edit-field-advert-price-0-value');
      if (priceField && priceField.length) {
        priceField.attr('type', 'text');
        priceField.number(true, 0);
        $(context).find('form#node-advert-edit-form').submit(function() {
          const value  = priceField.val();
          priceField.attr('type', 'number');
          priceField.val(value);
        });
      }

      const values = {
        'border-radius': '5px',
        'height': '32px',
        'line-height': '32px',
        'opacity': '1',
        'width': '32px'
      };
      $(context).find('span.a2a_svg').css(values);


      const images = $(context).find('div#carousel');
      images.flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: settings.flexslider_thumbnail_width,
        itemMargin: 5
      });

    }
  };
})(jQuery, Drupal);
