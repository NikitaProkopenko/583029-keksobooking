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


var MapPinParams = {
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
map.classList.remove('map--faded');

// Map pin

var mapPins = map.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// Map card

//var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card.popup');
var CardPhotoParams = {
  width: '45px',
  height: '40px',
};
var cardPhoto = document.createElement('img');

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

function generatePhotos() {
  var offerPhotos = PHOTOS;
  return offerPhotos;
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
    cardDataItem.offer.photos = generatePhotos(); // Посмотри алгоритм Фишера-Йетса (https://webformyself.com/sortirovka-massivov-v-javascript/)
    cardDataItem.location.x = getRandomInt(MIN_LOCATION_X, MAX_LOCATION_X) - MapPinParams.widthToCenter;
    cardDataItem.location.y = getRandomInt(MIN_LOCATION_Y, MAX_LOCATION_Y) - MapPinParams.height;

    cardData.push(cardDataItem);
  }
  return cardData;
}

// Map pin creation

function createPin() {
  // TODO Посмотреть document.createDocumentFragment();
  // TODO Список пинов для рендеринга передавать через параметр
  for (var i = 0; i < cardData.length; i++) {
    var mapPin = similarPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    mapPin.style.top = cardData[i].location.y + 'px';
    mapPin.style.left = cardData[i].location.x + 'px';

    mapPinImage.src = cardData[i].authors.avatar;
    mapPinImage.alt = cardData[i].offer.title;
    mapPins.appendChild(mapPin);
  }
  return mapPins;
}

createCard();
createPin();

for (var i = 0; i < cardData.length; i++) {
  createMapCardMainInfo(cardData[i]);
}


// Map card template creation

function createMapCardMainInfo(offerObject) {
  var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var newOfferCard = similarMapCardTemplate.cloneNode(true);

  newOfferCard.querySelector('.popup__avatar').src = offerObject.authors.avatar;
  newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
  newOfferCard.querySelector('.popup__title').textContent = offerObject.offer.title;
  newOfferCard.querySelector('.popup__text--price').textContent = offerObject.offer.price + '₽/ночь';
  newOfferCard.querySelector('.popup__text--capacity').textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
  newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerObject.offer.checkin + ', выезд до ' +  offerObject.offer.checkout;
  newOfferCard.querySelector('.popup__description').textContent = offerObject.offer.description;
  newOfferCard.querySelector('.popup__type').textContent = AppartmentTypes[offerObject.offer.type];

  map.insertBefore(newOfferCard, mapFilterContainer);
}

// function createMapCardFeature() {
//   for (var i = 0; i < cardData.length; i++) {
//
//     var mapCardFeatures = mapCard.querySelector('.popup__features');
//     mapCardFeatures.innerHTML = '';
//     var feature = document.createElement('li');
//     feature.className = 'popup__feature popup__feature--' + cardData[i].offer.features[i];
//     mapCardFeatures.appendChild(feature);
//   }
//   return mapCard;
// }

// function createMapCardPhotos() {
//   for (var i = 0; i < cardData.length; i++) {
//     var mapCard = similarMapCardTemplate.cloneNode(true);
//     var mapCardPhotos = mapCard.querySelector('.popup__photos');
//     for (var y = 0; y < cardData[i].offer.photos.length; y++) {
//       mapCardPhotos.innerHTML = '';
//       cardPhoto.alt = 'Фотография жилья';
//       cardPhoto.width = cardPhotoWidth;
//       cardPhoto.height = cardPhotoHeight;
//       cardPhoto.className = 'popup__photo';
//       cardPhoto.src = cardData[i].offer.photos[y];
//       mapCardPhotos.appendChild(cardPhoto);
//     }
//   }
//   return mapCard;
// }

// function createMapCard() {
//   for (var i = 0; i < cardData.length; i++) {
//     var mapCard = similarMapCardTemplate.cloneNode(true);
//     createMapCardMainInfo();
//     createMapCardType();
//     createMapCardFeature();
//     createMapCardPhotos();
//     map.insertBefore(mapCard, mapFilterContainer);
//   }
//   return mapCard;
// }


// createCard();
// createPin();
// createMapCard();

// TODO. Проверить вызов

// var allPins = generateObjects(); // Массив из 8 пинов
// createCard(allPins[0]);
