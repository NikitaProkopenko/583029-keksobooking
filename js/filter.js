'use strict';

(function () {

  var PriceTypes = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high',
  };

  var PriceSteps = {
    MIN: 10000,
    MAX: 50000,
  };

  var filtresForm = document.querySelector('.map__filters');
  var houseType = filtresForm.querySelector('#housing-type');
  var housePrice = filtresForm.querySelector('#housing-price');
  var houseRoom = filtresForm.querySelector('#housing-rooms');
  var houseGuest = filtresForm.querySelector('#housing-guests');
  var feautures = filtresForm.querySelectorAll('input[name="features"]');

  function compareValues(filterValue, compareValue) {
    return filterValue === window.constants.FILTER_ANY || compareValue === filterValue;
  }

  function compareByPrice(filterValue, offerPrice) {
    switch (filterValue) {
      case PriceTypes.MIDDLE:
        return offerPrice >= PriceSteps.MIN && offerPrice < PriceSteps.MAX;
      case PriceTypes.LOW:
        return offerPrice < PriceSteps.MIN;
      case PriceTypes.HIGH:
        return offerPrice >= PriceSteps.MAX;
      default:
        return true;
    }
  }

  function compareFeatures(filteredFetures, comparedValues) {
    for (var i = 0; i < filteredFetures.length; i++) {
      if (!comparedValues.includes(filteredFetures[i])) {
        return false;
      }
    }

    return true;
  }

  function setPacketFiltres() {

    var filterFeautures = Array.from(feautures);
    var selectedFeautures = filterFeautures.filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    });

    return window.map.pinsObjects.filter(function (it) {

      if (!compareValues(houseType.value, it.offer.type)) {
        return false;
      }

      if (!compareValues(houseRoom.value, it.offer.rooms.toString())) {
        return false;
      }

      if (!compareValues(houseGuest.value, it.offer.guests.toString())) {
        return false;
      }

      if (!compareByPrice(housePrice.value, it.offer.price)) {
        return false;
      }

      if (!compareFeatures(selectedFeautures, it.offer.features)) {
        return false;
      }

      return true;
    });
  }

  function onFiltresFormChange() {
    window.reset.removePin();
    window.mapPinRender.createPin(setPacketFiltres());
  }

  filtresForm.addEventListener('change', onFiltresFormChange);

  window.filter = {
    onFiltresFormChange: onFiltresFormChange,
    filtresForm: filtresForm,
  };

})();
