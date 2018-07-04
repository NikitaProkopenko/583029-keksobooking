'use strict';

(function () {

  var mapPinParams = {
    widthToCenter: 25,
    height: 70,
  };

  var mainMapPinParams = {
    widthToCenter: 32,
    width: 64,
    height: 84,
    startX: 570,
    startY: 375,
    coordinateX: window.mainElements.mainMapPin.offsetLeft,
    coordinateY: window.mainElements.mainMapPin.offsetTop,
  };

  function fillAddressCoordinate() {
    var addressField = document.querySelector('#address');
    var addressCoordinate;

    addressCoordinate = (mainMapPinParams.coordinateX + mainMapPinParams.widthToCenter) + ', '
      + (mainMapPinParams.coordinateY - mapPinParams.height);
    addressField.value = addressCoordinate;

    return addressField;
  }

  function preparePage() {
    window.form.disableFormsArray(window.mainElements.pageFieldsetArray);
    fillAddressCoordinate();
  }

  function activatePage() {
    window.form.allowFormArray(window.mainElements.pageFieldsetArray);
    window.mainElements.map.classList.remove('map--faded');
    window.mainElements.adForm.classList.remove('ad-form--disabled');
    window.backend.downloadData(function (data) {
      window.map.pinsObjects = data;
      window.mapPinRender.createPin(window.map.pinsObjects);
    }, function (error) {
      window.resultWindow.showErrorWindow(error);
    });
    window.mainElements.mainMapPin.removeEventListener('mouseup', activatePage);
  }

  window.onload = preparePage();
  window.mainElements.mainMapPin.addEventListener('mouseup', activatePage);

  var sendButton = window.mainElements.adForm.querySelector('.ad-form__submit');

  sendButton.addEventListener('click', function (evt) {
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
  });

  window.map = {
    fillAddressCoordinate: fillAddressCoordinate,
    mainMapPinParams: mainMapPinParams,
    pinsObjects: []
  };

})();
