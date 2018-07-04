'use strict';

(function () {
  var MAX_FILTER_RENDER = 5;

  var filters = document.querySelector('.map__filters');

  var houseType = filters.querySelector('#housing-type').options;
  var housePrice = filters.querySelector('#housing-price').options;
  var houseRooms = filters.querySelector('#housing-rooms').options;
  var houseGuests = filters.querySelector('#housing-guests').options;
  var houseFeatures = filters.querySelector('#housing-features').options;

  var filter = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: [],
  };

  for (var i = 0; i < houseType.length; i++) {
    if (houseType[i].value === filter.type) {
      houseType[i].selected = true;
    }
  }

  for (var j = 0; j < housePrice.length; j++) {
    if (housePrice[j].value === filter.type) {
      housePrice[j].selected = true;
    }
  }

  for (var k = 0; k < houseRooms.length; k++) {
    if (houseRooms[k].value === filter.type) {
      houseRooms[k].selected = true;
    }
  }

  for (var l = 0; l < houseGuests.length; l++) {

    if (houseGuests[l].value === filter.type) {
      houseGuests[l].selected = true;
    }
  }

  var filteredPins = [];
  var dataPins = [];
  function filterData(data) {
    dataPins = data;
    filters.addEventListener('change', filtersHandler);
  }

  function filtersHandler(evt) {
    var element = evt.target;
    var filterName = '';
    filteredPins = dataPins;

    if (element.nodeName === 'SELECT') {
      var selectedOption = element.options[element.selectedIndex].value;
      filterName = element.id.slice('housing-'.length);
      filter[filterName] = selectedOption;
    } else if (element.nodeName === 'INPUT') {
      filterName = 'features';
      if (element.checked === true) {
        filter[filterName].push(element.value);
      } else {
        filter[filterName].splice(filter[filterName].indexOf(element.value), 1);
      }
    }

    filteredPins = getFilteredPins(filter);
    window.mapPinRender.createPin(filteredPins);
  }

  function getFilteredPins(curFilter) {
    var filteredData = [];

    filteredPins.forEach(function (item) {

      var itemPrice = parseInt(item.offer.price, 10);
      if (itemPrice < 10000) {
        itemPrice = 'low';
      } else if (itemPrice >= 10000 && itemPrice < 50000) {
        itemPrice = 'middle';
      } else if (itemPrice >= 50000) {
        itemPrice = 'hight';
      } else {
        itemPrice = 'any';
      }

      var itemType = false;
      if (item.offer.type === curFilter.type) {
        itemType = item.offer.type;
      } else if (curFilter.type === 'any') {
        itemType = true;
      }

      var itemRoomsCount = false;
      if (item.offer.rooms === parseInt(curFilter.rooms, 10)) {
        itemRoomsCount = item.offer.rooms;
      } else if (curFilter.rooms === 'any') {
        itemRoomsCount = true;
      }

      var itemGuestsCount = false;
      if (item.offer.guests === parseInt(curFilter.guests, 10)) {
        itemGuestsCount = item.offer.guests;
      } else if (curFilter.guests === 'any') {
        itemGuestsCount = true;
      }

      var features = false;
      if (curFilter.features.length > 0) {
        curFilter.features.forEach(function (featureItem) {
          if (item.offer.features.indexOf(featureItem) !== -1) {
            features = item.offer.features;
          }
        });
      } else {
        features = true;
      }

      if (itemType && (curFilter.price === itemPrice || 'any') && itemRoomsCount && itemGuestsCount && features) {
        filteredData.push(item);
      }

    });

    return filteredData;
  }

  window.filter = {
    filterData: filterData,
  };

})();
