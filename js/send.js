'use strict';

(function () {

  var adTitleField = window.mainElements.adForm.querySelector('#title');

  window.mainElements.adForm.addEventListener('submit', function (evt) {
    if (adTitleField.validity.valid) {
      evt.preventDefault();
      sendingSuccessForm(evt);
    }
  });

  function sendingSuccessForm(evt) {
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
