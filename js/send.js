'use strict';

(function () {

  function onFormSubmit(evt) {
    if (window.form.adFormTitle.validity.valid && window.form.adFormPrice.validity.valid) {
      evt.preventDefault();
      sendingSuccessForm();
    }
  }

  window.mainElements.adForm.addEventListener('submit', onFormSubmit);

  function sendingSuccessForm() {
    var formData = new FormData(document.querySelector('.ad-form'));
    window.backend.uploadData(formData, function (status) {
      if (status) {
        window.resultWindow.onSuccessWindow();
        window.mainElements.mainMapPin.addEventListener('mouseup', window.reset.onFormReset);
      }
    }, function (error) {
      window.resultWindow.showErrorWindow(error);
    });
  }

  window.send = {
    onFormSubmit: onFormSubmit,
  };

})();
