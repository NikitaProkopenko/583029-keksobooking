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
    var addressCoordinate;

    addressCoordinate = (mainMapPinParams.coordinateX + mainMapPinParams.WIDTH_TO_CENTER) + ', '
      + (mainMapPinParams.coordinateY - mapPinParams.HEIGHT);
    window.mainElements.addressField.value = addressCoordinate;

  }

  function preparePage() {
    window.form.disableFormsArray(window.mainElements.pageFieldsetArray);
    fillAddressCoordinate();
    window.mainElements.adForm.removeEventListener('submit', window.send.onFormSubmit);
    window.reset.adFormReset.removeEventListener('click', window.reset.onResetClick);
    window.filter.filtresForm.removeEventListener('change', window.filter.onFiltresFormChange);
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
    window.form.bindListeners();
    window.mainElements.adForm.addEventListener('submit', window.send.onFormSubmit);
    window.reset.adFormReset.addEventListener('click', window.reset.onResetClick);
    window.filter.filtresForm.addEventListener('change', window.filter.onFiltresFormChange);
  }

  function onPageActivate() {
    activatePage();
  }

  preparePage();

  window.map = {
    fillAddressCoordinate: fillAddressCoordinate,
    mainMapPinParams: mainMapPinParams,
    pinsObjects: [],
    onPageActivate: onPageActivate,
  };

})();
