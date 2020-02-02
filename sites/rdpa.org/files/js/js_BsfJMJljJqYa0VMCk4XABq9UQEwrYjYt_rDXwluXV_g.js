(function ($) {

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      if (Drupal.settings.piwik.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
        // Mailto link clicked.
        _paq.push(["trackEvent", "Mails", "Click", this.href.substring(7)]);
      }

    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.piwik.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        _paq.push(["setCustomUrl", href]);
        _paq.push(["trackPageView"]);
      }
    });
  }

});

})(jQuery);
;
(function ($) {

Drupal.behaviors.openid = {
  attach: function (context) {
    var loginElements = $('.form-item-name, .form-item-pass, li.openid-link');
    var openidElements = $('.form-item-openid-identifier, li.user-link');
    var cookie = $.cookie('Drupal.visitor.openid_identifier');

    // This behavior attaches by ID, so is only valid once on a page.
    if (!$('#edit-openid-identifier.openid-processed').length) {
      if (cookie) {
        $('#edit-openid-identifier').val(cookie);
      }
      if ($('#edit-openid-identifier').val() || location.hash == '#openid-login') {
        $('#edit-openid-identifier').addClass('openid-processed');
        loginElements.hide();
        // Use .css('display', 'block') instead of .show() to be Konqueror friendly.
        openidElements.css('display', 'block');
      }
    }

    $('li.openid-link:not(.openid-processed)', context)
      .addClass('openid-processed')
      .click(function () {
         loginElements.hide();
         openidElements.css('display', 'block');
        // Remove possible error message.
        $('#edit-name, #edit-pass').removeClass('error');
        $('div.messages.error').hide();
        // Set focus on OpenID Identifier field.
        $('#edit-openid-identifier')[0].focus();
        return false;
      });
    $('li.user-link:not(.openid-processed)', context)
      .addClass('openid-processed')
      .click(function () {
         openidElements.hide();
         loginElements.css('display', 'block');
        // Clear OpenID Identifier field and remove possible error message.
        $('#edit-openid-identifier').val('').removeClass('error');
        $('div.messages.error').css('display', 'block');
        // Set focus on username field.
        $('#edit-name')[0].focus();
        return false;
      });
  }
};

})(jQuery);
;
