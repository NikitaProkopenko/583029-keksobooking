'use strict';

(function () {

  var adFormReset = window.mainElements.adForm.querySelector('.ad-form__reset');

  function removePin() {
    var currentCard = window.mainElements.map.querySelector('.map__card');
    var mapPins = window.mainElements.map.querySelector('.map__pins');
    var fullPinList = mapPins.querySelectorAll('button', 'map-pin');

    for (var i = 1; i < fullPinList.length; i++) {
      mapPins.removeChild(fullPinList[i]);
    }

    if (currentCard) {
      window.mainElements.map.removeChild(currentCard);
    }
  }

  function mainPinCoordinateReset() {
    window.mainElements.mainMapPin.style.top = window.map.mainMapPinParams.startY + 'px';
    window.mainElements.mainMapPin.style.left = window.map.mainMapPinParams.startX + 'px';
  }

  function activatePageAfterReset() {
    window.form.allowFormArray(window.mainElements.pageFieldsetArray);
    window.mainElements.map.classList.remove('map--faded');
    window.mainElements.adForm.classList.remove('ad-form--disabled');
    window.map.fillAddressCoordinate('active');
    window.backend.downloadData(function (data) {
      window.mapPinRender.createPin(data);
    }, function (error) {
      window.resultWindow.showErrorWindow(error);
    });

    window.mainElements.mainMapPin.removeEventListener('mouseup', activatePageAfterReset);
  }

  function resetForm() {
    var currentCard = window.mainElements.map.querySelector('.map__card');
    window.mainElements.adForm.reset();
    window.mainElements.map.classList.add('map--faded');
    window.mainElements.adForm.classList.add('ad-form--disabled');
    window.map.fillAddressCoordinate();
    window.form.disableFormsArray(window.mainElements.pageFieldsetArray);
    mainPinCoordinateReset();
    removePin();

    if (currentCard) {
      window.mainElements.map.removeChild(currentCard);
    }
  }

  adFormReset.addEventListener('click', function () {
    resetForm();
    window.mainElements.mainMapPin.addEventListener('mouseup', activatePageAfterReset);
  });

  window.reset = {
    resetForm: resetForm,
    activatePageAfterReset: activatePageAfterReset,
    removePin: removePin,
  };

})();
