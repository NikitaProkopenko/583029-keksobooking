'use strict';

var AVATARS = 'img/avatars/user0';
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = '';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var CARDS_QUANTITY = 8;
var ESCAPE = 'Escape';
var DEFAULT_SELECTED_ROOM = '1';
var MIN_PRICE_PARAMS = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

var mapPinParams = {
  widthToCenter: 25,
  height: 70,
};

var cardData = [];

var AppartmentTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

// Removed fade class

var map = document.querySelector('.map');
var mapFilterContainer = map.querySelector('.map__filters-container');

// Map card

var CARD_PHOTO_PARAMS = {
  width: 45,
  height: 40,
  class: 'popup__photo',
  alt: 'Фотография жилья',
};

// Test data generation

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomElementsFromCollection(count, sourceCollection) {
  var randomElementsCollection = [];
  for (var i = 0; i < count; i++) {
    randomElementsCollection.push(sourceCollection[getRandomInt(0, sourceCollection.length)]);
  }
  return randomElementsCollection;
}

function generateAvatar(avatarNumber) {
  return AVATARS + avatarNumber + '.png';
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function createCard() {
  for (var i = 0; i < CARDS_QUANTITY; i++) {
    var cardDataItem = {
      'authors': {},
      'offer': {},
      'location': {},
    };

    cardDataItem.authors.avatar = generateAvatar(i + 1);
    cardDataItem.offer.title = TITLES[getRandomInt(0, TITLES.length - 1)];
    cardDataItem.offer.address = getRandomInt(1, 1000) + ', ' + getRandomInt(1, 1000);
    cardDataItem.offer.price = getRandomInt(1000, 1000000);
    cardDataItem.offer.type = getRandomElementsFromCollection(1, TYPES);
    cardDataItem.offer.rooms = getRandomInt(1, 5);
    cardDataItem.offer.guests = getRandomInt(1, 5);
    cardDataItem.offer.checkin = getRandomElementsFromCollection(1, CHECKIN);
    cardDataItem.offer.checkout = getRandomElementsFromCollection(1, CHECKOUT);
    cardDataItem.offer.features = getRandomElementsFromCollection(getRandomInt(1, FEATURES.length), FEATURES);
    cardDataItem.offer.description = DESCRIPTION;
    cardDataItem.offer.photos = shuffleArray(PHOTOS);
    cardDataItem.location.x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X) - mapPinParams.widthToCenter;
    cardDataItem.location.y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y) - mapPinParams.height;

    cardData.push(cardDataItem);
  }
  return cardData;
}

// Map pin creation

function createPin(offerPinObject) {
  var mapPins = map.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offerPinObject.length; i++) {
    var mapPin = similarPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');
    mapPin.style.top = offerPinObject[i].location.y + 'px';
    mapPin.style.left = offerPinObject[i].location.x + 'px';

    mapPin.addEventListener('click', pinClickHandler.bind(undefined, offerPinObject[i]));

    mapPinImage.src = offerPinObject[i].authors.avatar;
    mapPinImage.alt = offerPinObject[i].offer.title;
    fragment.appendChild(mapPin);
  }

  mapPins.appendChild(fragment);
  return mapPins;
}

function pinClickHandler(offer) {
  createMapCardMainInfo(offer);
}

function closeCard(card) {
  map.removeChild(card);
}

function removeCardHandler(evt) {
  if (evt.key === ESCAPE) {
    var currentCard = map.querySelector('.map__card');
    if (currentCard) {
      closeCard(currentCard);
    }
    document.removeEventListener('keydown', removeCardHandler);
  }
}

function closeCardHandler(evt) {
  closeCard(evt.currentTarget.parentNode);
}

// Map card template creation

function createMapCardMainInfo(offerObject) {
  var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var newOfferCard = similarMapCardTemplate.cloneNode(true);

  newOfferCard.querySelector('.popup__avatar').src = offerObject.authors.avatar;
  newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  newOfferCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  newOfferCard.querySelector('.popup__text--price').textContent = offerObject.offer.price + '₽/ночь';
  newOfferCard.querySelector('.popup__text--capacity').textContent = offerObject.offer.rooms +
    ' комнаты для ' + offerObject.offer.guests + ' гостей';
  newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' +
    offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
  newOfferCard.querySelector('.popup__description').textContent = offerObject.offer.description;
  newOfferCard.querySelector('.popup__type').textContent = AppartmentTypes[offerObject.offer.type];
  newOfferCard.querySelector('.popup__features').innerHTML = '';
  newOfferCard.querySelector('.popup__photos').innerHTML = '';

  createMapCardFeature(offerObject, newOfferCard);
  createMapCardPhotos(offerObject, newOfferCard);

  document.addEventListener('keydown', removeCardHandler);

  newOfferCard.querySelector('.popup__close').addEventListener('click', closeCardHandler);

  var existCard = map.querySelector('.map__card');

  if (existCard) {
    return map.replaceChild(newOfferCard, existCard);
  }

  return map.insertBefore(newOfferCard, mapFilterContainer);
}

function createMapCardFeature(offerFeatureObject, offerFeatureCard) {
  var similarFeature = document.createElement('li');

  for (var x = 0; x < offerFeatureObject.offer.features.length; x++) {
    var feature = similarFeature.cloneNode(true);
    feature.className = 'popup__feature popup__feature--' + offerFeatureObject.offer.features[x];
    var featureList = offerFeatureCard.querySelector('.popup__features').appendChild(feature);
  }
  return featureList;
}

function createMapCardPhotos(offerPhotoObject, offerPhotoCard) {
  var similarPhoto = document.createElement('img');

  for (var y = 0; y < offerPhotoObject.offer.photos.length; y++) {
    var photo = similarPhoto.cloneNode(true);
    photo.alt = CARD_PHOTO_PARAMS.alt;
    photo.width = CARD_PHOTO_PARAMS.width;
    photo.height = CARD_PHOTO_PARAMS.height;
    photo.className = CARD_PHOTO_PARAMS.class;
    photo.src = offerPhotoObject.offer.photos[y];
    var photoList = offerPhotoCard.querySelector('.popup__photos').appendChild(photo);
  }
  return photoList;
}

var mainMapPin = document.querySelector('.map__pin--main');
var pageFieldsetArray = document.querySelectorAll('fieldset');
var adForm = document.querySelector('.ad-form');

var mainMapPinParams = {
  widthToCenterDisabled: 78,
  widthToCenter: 32,
  height: 84,
  startX: 570,
  startY: 375,
};

function fillAddressCoordinate(state) {
  var addressField = document.querySelector('#address');
  var addressCoordinate;
  if (state === 'active') {
    addressCoordinate = (mainMapPinParams.startX + mainMapPinParams.widthToCenter) + ', '
      + (mainMapPinParams.startY - mapPinParams.height);
  } else if (state === 'disabled') {
    addressCoordinate = (mainMapPinParams.startX + mainMapPinParams.widthToCenterDisabled) + ', '
      + (mainMapPinParams.startY - mainMapPinParams.widthToCenterDisabled);
  }
  addressField.value = addressCoordinate;
  return addressField;
}

function disableFormsArray(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', '');
  }
  return array;
}

function allowFormArray(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled');
  }
  return array;
}

function preparePage() {
  disableFormsArray(pageFieldsetArray);
  fillAddressCoordinate('disabled');
}


function activatePage() {
  allowFormArray(pageFieldsetArray);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fillAddressCoordinate('active');
  createCard();
  createPin(cardData);

  mainMapPin.removeEventListener('mouseup', activatePage);
}

window.onload = preparePage();
mainMapPin.addEventListener('mouseup', activatePage);

// module4-task2

var adFormTitle = adForm.querySelector('#title');
var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var invalidMarker = 'border: 3px solid red';

adFormTitle.addEventListener('invalid', function (evt) {
  var target = evt.target;

  if (target.validity.tooShort) {
    target.setCustomValidity('Заголовок должен состоять минимум из 30 символов.');
    target.style = invalidMarker;
  } else if (target.validity.tooLong) {
    target.setCustomValidity('Заголовок состоит максимум из 100 символов.');
    target.style = invalidMarker;
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле.');
    target.style = invalidMarker;
  } else {
    target.setCustomValidity('');
    target.style = '';
  }
});

adFormPrice.addEventListener('invalid', function (evt) {
  var target = evt.target;

  if (target.value > 1000000) {
    target.setCustomValidity('Цена не должна превышать 1 000 000 руб.');
    target.style = invalidMarker;
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле.');
    target.style = invalidMarker;
  } else if (target.value < target.min) {
    target.setCustomValidity('Минимальная цена ' + target.min + ' руб.');
  } else {
    target.setCustomValidity('');
    target.style = '';
  }
});

adFormType.addEventListener('change', function (evt) {
  var target = evt.target;
  var price = adFormPrice;

  switch (target.value) {
    case 'bungalo':
      price.min = MIN_PRICE_PARAMS.bungalo;
      price.placeholder = MIN_PRICE_PARAMS.bungalo;
      break;
    case 'flat':
      price.min = MIN_PRICE_PARAMS.flat;
      price.placeholder = MIN_PRICE_PARAMS.flat;
      break;
    case 'house':
      price.min = MIN_PRICE_PARAMS.house;
      price.placeholder = MIN_PRICE_PARAMS.house;
      break;
    case 'palace':
      price.min = MIN_PRICE_PARAMS.palace;
      price.placeholder = MIN_PRICE_PARAMS.palace;
      break;
    default:
      price.min = MIN_PRICE_PARAMS.flat;
      price.placeholder = MIN_PRICE_PARAMS.flat;
  }
});

adFormTimeIn.addEventListener('change', function (evt) {
  var target = evt.target;
  adFormTimeOut.value = target.value;
});

adFormTimeOut.addEventListener('change', function (evt) {
  var target = evt.target;
  adFormTimeIn.value = target.value;
});

var RoomCapacityDict = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

function setCapacity(selectedRoom) {
  var capacities = adFormCapacity.querySelectorAll('option');

  for (var i = 0; i < capacities.length; i++) {
    capacities[i].disabled = !RoomCapacityDict[selectedRoom].includes(capacities[i].value);
  }

  if (adFormCapacity.options[adFormCapacity.selectedIndex].disabled) {
    adFormCapacity.value = RoomCapacityDict[selectedRoom][0];
  }
}

function formRoomNumberHandler(evt) {
  setCapacity(evt.currentTarget.value);
}

setCapacity(DEFAULT_SELECTED_ROOM);

adFormRoomNumber.addEventListener('change', formRoomNumberHandler);

adFormCapacity.addEventListener('change', function (evt) {
  var target = evt.target;
  if (adFormRoomNumber.value !== target.value) {
    adFormRoomNumber.style = invalidMarker;
  } else {
    adFormRoomNumber.style = '';
  }
});

var adFormReset = adForm.querySelector('.ad-form__reset');
function removePin() {
  var mapPins = map.querySelector('.map__pins');
  var fullPinList = mapPins.querySelectorAll('button', 'map-pin');

  for (var i = 1; i < fullPinList.length; i++) {
    mapPins.removeChild(fullPinList[i]);
  }
}

adFormReset.addEventListener('click', function () {
  adForm.reset();
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  fillAddressCoordinate('disabled');
  disableFormsArray(pageFieldsetArray);
  removePin();
});

// module5-task1

mainMapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
    mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        mainMapPin.removeEventListener('click', onClickPreventDefault);
      };
      mainMapPin.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
