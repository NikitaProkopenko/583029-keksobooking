'use strict';

(function () {

  window.mainElements.adForm.addEventListener('submit', function (evt) {
    if (window.form.adFormTitle.validity.valid && window.form.adFormPrice.validity.valid) {
      evt.preventDefault();
      sendingSuccessForm();
    }
  });

  function sendingSuccessForm() {
    var formData = new FormData(document.querySelector('.ad-form'));
    window.backend.uploadData(formData, function (status) {
      if (status) {
        window.resultWindow.successWindowHandler();
        window.mainElements.mainMapPin.addEventListener('mouseup', window.reset.onFormReset);
      }
    }, function (error) {
      window.resultWindow.showErrorWindow(error);
    });
  }

})();
