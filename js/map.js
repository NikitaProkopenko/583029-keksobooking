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
    mapPinImage.src = offerPinObject[i].authors.avatar;
    mapPinImage.alt = offerPinObject[i].offer.title;
    fragment.appendChild(mapPin);
  }

  mapPins.appendChild(fragment);
  return mapPins;
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
  map.insertBefore(newOfferCard, mapFilterContainer);
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

var pageFieldsetArray = document.querySelectorAll('fieldset');
var mainMapPin = document.querySelector('.map__pin--main');
var addressField = document.querySelector('#address');

var mainPinDisabledState = {
  width: 156,
  height: 156,
  x: 648,
  y: 297,
};

var mainPinActiveState = {
  x: 602.5,
  y: 291,
};

function fillAddressCoordinate(coordinateObject) {
  addressField.placeholder = coordinateObject.x + ', ' + coordinateObject.y;
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

disableFormsArray(pageFieldsetArray);
fillAddressCoordinate(mainPinDisabledState);

function activatePage() {
  allowFormArray(pageFieldsetArray);
  map.classList.remove('map--faded');
  fillAddressCoordinate(mainPinActiveState);
}

mainMapPin.addEventListener('mouseup', activatePage);

// createCard();
// createPin(cardData);
// createMapCardMainInfo(cardData[0]);
