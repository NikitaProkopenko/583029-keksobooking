'use strict';

(function () {

  var filtresForm = document.querySelector('.map__filters');
  var houseType = filtresForm.querySelector('#housing-type');
  var housePrice = filtresForm.querySelector('#housing-price');
  var houseRooms = filtresForm.querySelector('#housing-rooms');
  var houseGuests = filtresForm.querySelector('#housing-guests');
  var feauturesList = filtresForm.querySelectorAll('input[name="features"]');

  var PriceTypes = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high',
  };

  var PriceSteps = {
    MIN: 10000,
    MAX: 50000,
  };

  function compareValues(filterValue, compareValue) {
    return filterValue === 'any' || compareValue === filterValue;
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

  var compareFeatures = function (filteredFetures, comparedValues) {
    for (var i = 0; i < filteredFetures.length; i++) {
      if (!comparedValues.includes(filteredFetures[i])) {
        return false;
      }
    }

    return true;
  };

  var setPacketFiltres = function () {

    var feauturesArr = Array.from(feauturesList);
    var selectedFeautures = feauturesArr.filter(function (it) {
      return it.checked;
    }).map(function (it) {
      return it.value;
    });

    return window.map.pinsObjects.filter(function (it) {

      if (!compareValues(houseType.value, it.offer.type)) {
        return false;
      }

      if (!compareValues(houseRooms.value, it.offer.rooms.toString())) {
        return false;
      }

      if (!compareValues(houseGuests.value, it.offer.guests.toString())) {
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
  };

  function onFiltresFormChange() {
    window.reset.removePin();
    window.mapPinRender.createPin(setPacketFiltres());
  }

  filtresForm.addEventListener('change', onFiltresFormChange);

})();
