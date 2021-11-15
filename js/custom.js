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

      $(context).find('input#edit-field-advert-locality').removeClass('form-control'); //To hide shs input field

      const header = $(context).find('header.fixed-top');
      if (settings.toolbar !== undefined) {
        header.css('top', '79px');
      }
      $(context).find('div.grand-wrapper').css('margin-top', header.height());

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
