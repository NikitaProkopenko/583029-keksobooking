'use strict';

(function () {

  var sendButton = window.mainElements.adForm.querySelector('.ad-form__submit');

  sendButton.addEventListener('submit', function (evt) {
    var validationResult = formValidationCheck();
    if (validationResult === true) {
      sendingSuccessForm(evt);
    }
  });

  function formValidationCheck() {

    var form = window.mainElements.adForm;
    var inputs = form.querySelectorAll('input[required]');
    var result = false;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains('invalid-marker')) {
        result = false;
      } else {
        result = true;
      }
    }
    return result;
  }

  function sendingSuccessForm(evt) {
    evt.preventDefault();
    var formData = new FormData(document.querySelector('.ad-form'));
    window.backend.uploadData(formData, function (status) {
      if (status) {
        window.resultWindow.successWindowHandler();
        window.mainElements.mainMapPin.addEventListener('mouseup', window.reset.activatePageAfterReset);
      }
    }, function (error) {
      window.resultWindow.showErrorWindow(error);
    });
  }

})();
