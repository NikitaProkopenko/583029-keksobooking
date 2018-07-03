'use strict';

(function () {
  var MAX_FILTER_RENDER = 5;

  var filters = document.querySelector('.map__filters');
  var houseType = filters.querySelector('#housing-type');
  var housePrice = filters.querySelector('#housing-price');
  var houseRooms = filters.querySelector('#housing-rooms');
  var houseGuests = filters.querySelector('#housing-guests');
  var houseFeatures = filters.querySelector('#housing-features');

  function filterHouseType(data) {
    houseType.addEventListener('change', function (evt) {
      var target = evt.target;

      for (var i = 0; i < data.length; i++) {
        if ( data[i].offer.type === 'bungalo') {
          console.log(data.filter(data[i].offer.type));
        } else {
          console.log('lol' + data[i].offer.type);
        }
      }
    });
  }

  function filterData(data) {
    console.log(data);
    filterHouseType(data);
  }

  window.filter = {
    filterData: filterData,
  };

})();
