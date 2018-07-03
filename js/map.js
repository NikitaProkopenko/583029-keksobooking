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
      window.mapPinRender.createPin(data);
    }, function (error) {
      console.log(error);
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
      // function hideSuccessWindow() {
      //   successWindow.classList.add('hidden');
      // }
      if (status) {
        var successWindow = document.querySelector('.success');
        successWindow.classList.remove('hidden');
        window.reset.resetForm();
        setTimeout(function () {
          successWindow.classList.add('hidden');
        }, 3000);
      }
    }, function (error) {
      var errorWindow = document.querySelector('.error');
      var errorMessage = errorWindow.querySelector('.error__message');
      errorMessage.innerText = error;
      errorWindow.classList.remove('hidden');
      // function showErrorWindow() {
      //   errorWindow.classList.add('hidden');
      // }
      setTimeout(function () {
        errorWindow.classList.add('hidden');
      }, 3000);
      window.mainElements.mainMapPin.addEventListener('mouseup', window.reset.activatePageAfterReset);
    });
  });

  window.map = {
    fillAddressCoordinate: fillAddressCoordinate,
    mainMapPinParams: mainMapPinParams,
  };

})();
