'use strict';

(function () {

  var MAX_APPARTMENT_PRICE = 1000000;
  var DEFAULT_SELECTED_ROOM = '1';
  var ESCAPE = 'Escape';
  var MAX_PINS_COUNT = 5;
  var FILTER_ANY = 'any';
  var WINDOW_TIMER = 3000;

  var MIN_PRICE_PARAMETERS = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  var CARD_PHOTO_PARAMETERS = {
    width: 45,
    height: 40,
    class: 'popup__photo',
    alt: 'Фотография жилья',
  };

  var PIN_BREAK_POINTS = {
    minX: 0,
    maxX: 1136,
    minY: 130,
    maxY: 630,
  };

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

  window.constants = {
    MAX_APPARTMENT_PRICE: MAX_APPARTMENT_PRICE,
    DEFAULT_SELECTED_ROOM: DEFAULT_SELECTED_ROOM,
    ESCAPE: ESCAPE,
    MAX_PINS_COUNT: MAX_PINS_COUNT,
    FILTER_ANY: FILTER_ANY,
    WINDOW_TIMER: WINDOW_TIMER,
    MIN_PRICE_PARAMETERS: MIN_PRICE_PARAMETERS,
    CARD_PHOTO_PARAMETERS: CARD_PHOTO_PARAMETERS,
    PIN_BREAK_POINTS: PIN_BREAK_POINTS,
    AppartmentPriceTypes: AppartmentPriceTypes,
    RoomCapacityDict: RoomCapacityDict,
  };

})();
