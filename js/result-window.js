'use strict';

(function () {
  function onSuccessWindow() {
    window.mainElements.successWindow.classList.remove('hidden');
    window.reset.resetForm();
    document.addEventListener('keydown', onSuccessWindowRemove);
    window.mainElements.adForm.removeEventListener('submit', window.send.onFormSubmit);
    window.reset.adFormReset.removeEventListener('click', window.reset.onResetClick);
    window.filter.filtresForm.removeEventListener('change', window.filter.onFiltresFormChange);
  }

  function onSuccessWindowRemove(evt) {
    if (evt.key === window.constants.ESCAPE) {
      if (window.mainElements.successWindow) {
        window.mainElements.successWindow.classList.add('hidden');
      }
      document.removeEventListener('keydown', onSuccessWindowRemove);
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
    onSuccessWindow: onSuccessWindow,
    showErrorWindow: showErrorWindow,
  };

})();
