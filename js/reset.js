'use strict';

(function () {

  var adFormReset = window.mainElements.adForm.querySelector('.ad-form__reset');

  function removePin() {
    var currentCard = window.mainElements.map.querySelector('.map__card');
    var fullPinList = window.mainElements.mapPins.querySelectorAll('button', 'map-pin');

    for (var i = 1; i < fullPinList.length; i++) {
      window.mainElements.mapPins.removeChild(fullPinList[i]);
    }

    if (currentCard) {
      window.mainElements.map.removeChild(currentCard);
    }
  }

  function mainPinCoordinateReset() {
    window.mainElements.mainMapPin.style.top = window.map.mainMapPinParams.START_Y + 'px';
    window.mainElements.mainMapPin.style.left = window.map.mainMapPinParams.START_X + 'px';
  }

  function activatePageAfterReset() {
    window.form.allowFormArray(window.mainElements.pageFieldsetArray);
    window.mainElements.map.classList.remove('map--faded');
    window.mainElements.adForm.classList.remove('ad-form--disabled');
    window.backend.downloadData(function (data) {
      window.mapPinRender.createPin(data);
    }, function (error) {
      window.resultWindow.showErrorWindow(error);
    });

    window.mainElements.mainMapPin.removeEventListener('mouseup', onFormReset);
    window.form.bindListeners();
    window.mainElements.adForm.addEventListener('submit', window.send.onFormSubmit);
    window.reset.adFormReset.addEventListener('click', window.reset.onResetClick);
    window.filter.filtresForm.addEventListener('change', window.filter.onFiltresFormChange);
  }

  function resetForm() {
    window.mainElements.adForm.reset();
    window.mainElements.mapFiltersForm.reset();
    window.mainElements.map.classList.add('map--faded');
    window.mainElements.adForm.classList.add('ad-form--disabled');
    window.map.fillAddressCoordinate();
    window.form.disableFormsArray(window.mainElements.pageFieldsetArray);
    mainPinCoordinateReset();
    removePin();

    if (window.form.adFormTitle.classList.contains('invalid-marker')) {
      window.form.adFormTitle.classList.remove('invalid-marker');
    } else if (window.form.adFormPrice.classList.contains('invalid-marker')) {
      window.form.adFormPrice.classList.remove('invalid-marker');
    }

    window.form.removeListeners();
  }

  function onFormReset() {
    activatePageAfterReset();
  }

  function onResetClick(evt) {
    evt.preventDefault();
    resetForm();
    window.mainElements.mainMapPin.addEventListener('mouseup', onFormReset);
    window.mainElements.adForm.removeEventListener('submit', window.send.onFormSubmit);
    window.reset.adFormReset.removeEventListener('click', window.reset.onResetClick);
    window.filter.filtresForm.removeEventListener('change', window.filter.onFiltresFormChange);
  }

  adFormReset.addEventListener('click', onResetClick);

  window.reset = {
    resetForm: resetForm,
    removePin: removePin,
    onFormReset: onFormReset,
    onResetClick: onResetClick,
    adFormReset: adFormReset,
  };

})();
