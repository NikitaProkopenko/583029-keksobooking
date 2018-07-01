'use strict';

(function () {

  var MAX_APPARTMENT_PRICE = 1000000;

  var AppartmentPriceTypes = {
    bungalo: 'bungalo',
    flat: 'flat',
    house: 'house',
    palace: 'palace',
  };

  var RoomCapacityDict = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var DEFAULT_SELECTED_ROOM = '1';

  var MIN_PRICE_PARAMS = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var ESCAPE = 'Escape';

  window.constants = {
    MAX_APPARTMENT_PRICE: MAX_APPARTMENT_PRICE,
    DEFAULT_SELECTED_ROOM: DEFAULT_SELECTED_ROOM,
    MIN_PRICE_PARAMS: MIN_PRICE_PARAMS,
    AppartmentPriceTypes: AppartmentPriceTypes,
    RoomCapacityDict: RoomCapacityDict,
    ESCAPE: ESCAPE,
  };

})();
