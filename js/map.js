'use strict';

(function () {

  var mapPinParams = {
    WIDTH_TO_CENTER: 25,
    HEIGHT: 70,
  };

  var mainMapPinParams = {
    WIDTH_TO_CENTER: 32,
    WIDTH: 64,
    HEIGHT: 84,
    START_X: 570,
    START_Y: 375,
    coordinateX: window.mainElements.mainMapPin.offsetLeft,
    coordinateY: window.mainElements.mainMapPin.offsetTop,
  };

  function fillAddressCoordinate() {
    var addressField = document.querySelector('#address');
    var addressCoordinate;

    addressCoordinate = (mainMapPinParams.coordinateX + mainMapPinParams.WIDTH_TO_CENTER) + ', '
      + (mainMapPinParams.coordinateY - mapPinParams.HEIGHT);
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

  sendButton.addEventListener('click', function () {
    var validationResult = formValidationCheck();
    if (validationResult === false) {
      sendingSuccessForm();
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

  function sendingSuccessForm() {
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

  window.map = {
    fillAddressCoordinate: fillAddressCoordinate,
    mainMapPinParams: mainMapPinParams,
    pinsObjects: []
  };

})();
