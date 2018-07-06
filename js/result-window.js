'use strict';

(function () {
  function successWindowHandler() {
    var successWindow = document.querySelector('.success');
    successWindow.classList.remove('hidden');
    window.reset.resetForm();
    document.addEventListener('keydown', removeSuccessWindowHandler);
  }

  function removeSuccessWindowHandler(evt) {
    if (evt.key === window.constants.ESCAPE) {
      var successWindow = document.querySelector('.success');
      if (successWindow) {
        successWindow.classList.add('hidden');
      }
      document.removeEventListener('keydown', removeSuccessWindowHandler);
    }
  }

  function showErrorWindow(error) {
    var errorWindow = document.querySelector('.error');
    var errorMessage = errorWindow.querySelector('.error__message');
    errorMessage.innerText = error;
    errorWindow.classList.remove('hidden');
    setTimeout(function () {
      errorWindow.classList.add('hidden');
    }, window.constants.WINDOW_TIMER);
  }

  window.resultWindow = {
    successWindowHandler: successWindowHandler,
    showErrorWindow: showErrorWindow,
  };

})();
