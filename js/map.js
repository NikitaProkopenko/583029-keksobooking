'use strict';

var AVATARS = 'img/avatars/user0';
var TITLES = [
  'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = '';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MIN_LOCATION_X = 300;
var MAX_LOCATION_X = 900;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var CARDS_QUANTITY = 8;

var cycleCount;
var cardData = [];

var appartmentTypes = {
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

var MAP_PIN_WIDTH_CENTER = 25;
var MAP_PIN_HEIGHT = 70;

// Map card

var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card.popup');
var cardPhotoWidth = 45;
var cardPhotoHeight = 40;
var cardPhoto = document.createElement('img');

// Test data generation

function generateAvatar() {
  var count = cycleCount + 1;
  var avatarImage = AVATARS + count + '.png';
  return avatarImage;
}

function generateTitle() {
  var cardTitle = TITLES[cycleCount];
  return cardTitle;
}

function generateAddress() {
  var minCoordinate = 1;
  var maxCoordinate = 1000;
  var cardAddressX = Math.floor(Math.random() * (maxCoordinate - minCoordinate)) + minCoordinate;
  var cardAddressY = Math.floor(Math.random() * (maxCoordinate - minCoordinate)) + minCoordinate;
  return cardAddressX + ', ' + cardAddressY;
}

function generatePrice() {
  var minPrice = 1000;
  var maxPrice = 1000000;
  var offerPrice = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
  return offerPrice;
}

function generateType() {
  var maxTypesArrayLength = TYPES.length;
  var minTypesArrayLength = 0;
  var offerType = TYPES[Math.floor(Math.random() * (maxTypesArrayLength - minTypesArrayLength)) + minTypesArrayLength];
  return offerType;
}

function generateRooms() {
  var minRoomsCount = 1;
  var maxRoomsCount = 5;
  var offerRooms = Math.floor(Math.random() * (maxRoomsCount - minRoomsCount)) + minRoomsCount;
  return offerRooms;
}

function generateGuests() {
  var minGuestsCount = 1;
  var maxGuestsCount = 5;
  var offerGuests = Math.floor(Math.random() * (maxGuestsCount - minGuestsCount)) + minGuestsCount;
  return offerGuests;
}

function generateCheckin() {
  var maxCheckinArrayLength = CHECKIN.length;
  var minCheckinArrayLength = 0;
  var offerCheckin = CHECKIN[Math.floor(Math.random() * (maxCheckinArrayLength - minCheckinArrayLength)) + minCheckinArrayLength];
  return offerCheckin;
}

function generateCheckout() {
  var maxCheckoutArrayLength = CHECKIN.length;
  var minCheckoutArrayLength = 0;
  var offerCheckout = CHECKOUT[Math.floor(Math.random() * (maxCheckoutArrayLength - minCheckoutArrayLength)) + minCheckoutArrayLength];
  return offerCheckout;
}

function generateFeatures() {
  var maxFeatureCount = FEATURES.length;
  var minFeatureCount = 0;
  var featureArrayLength = Math.floor(Math.random() * (maxFeatureCount - minFeatureCount)) + minFeatureCount;
  var offerFeatures = [];
  for (var i = 0; i < featureArrayLength; i++) {
    offerFeatures.push(FEATURES[i]);
  }
  return offerFeatures;
}

function generatePhotos() {
  var offerPhotos = PHOTOS;
  return offerPhotos;
}

function generateLocationX() {
  var locationX = Math.floor(Math.random() * (MAX_LOCATION_X - MIN_LOCATION_X)) + MIN_LOCATION_X;
  return locationX;
}

function generateLocationY() {
  var locationY = Math.floor(Math.random() * (MAX_LOCATION_Y - MIN_LOCATION_Y)) + MIN_LOCATION_Y;
  return locationY;
}

function createCard() {
  for (var i = 0; i < CARDS_QUANTITY; i++) {
    cycleCount = i;
    var cardDataItem = {
      'authors': {},
      'offer': {},
      'location': {},
    };
    cardDataItem.authors.avatar = generateAvatar();
    cardDataItem.offer.title = generateTitle();
    cardDataItem.offer.address = generateAddress();
    cardDataItem.offer.price = generatePrice();
    cardDataItem.offer.type = generateType();
    cardDataItem.offer.rooms = generateRooms();
    cardDataItem.offer.guests = generateGuests();
    cardDataItem.offer.checkin = generateCheckin();
    cardDataItem.offer.checkout = generateCheckout();
    cardDataItem.offer.features = generateFeatures();
    cardDataItem.offer.description = DESCRIPTION;
    cardDataItem.offer.photos = generatePhotos();
    cardDataItem.location.x = generateLocationX();
    cardDataItem.location.y = generateLocationY();
    cardData.push(cardDataItem);
  }
  return cardData;
}

// Map pin creation

function createPin() {
  for (var i = 0; i < cardData.length; i++) {
    var mapPin = similarPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');
    mapPin.style = 'left: ' + (cardData[i].location.x - MAP_PIN_WIDTH_CENTER) + 'px;' + ' top: ' + (cardData[i].location.y + MAP_PIN_HEIGHT) + 'px;';
    mapPinImage.src = cardData[i].authors.avatar;
    mapPinImage.alt = cardData[i].offer.title;
    mapPins.appendChild(mapPin);
  }
  return mapPins;
}

// Map card template creation

function createMapCardMainInfo() {
  for (var i = 0; i < cardData.length; i++) {
    var mapCard = similarMapCardTemplate.cloneNode(true);
    var mapCardTitle = mapCard.querySelector('.popup__title');
    var mapCardAddress = mapCard.querySelector('.popup__text--address');
    var mapCardPrice = mapCard.querySelector('.popup__text--price');
    var mapCardRoomsGuests = mapCard.querySelector('.popup__text--capacity');
    var mapCardCheckinCheckout = mapCard.querySelector('.popup__text--time');
    var mapCardDescription = mapCard.querySelector('.popup__description');
    var mapCardAvatar = mapCard.querySelector('.popup__avatar');
    mapCardTitle.innerHTML = cardData[i].offer.title;
    mapCardAddress.innerHTML = cardData[i].offer.address;
    mapCardPrice.innerHTML = cardData[i].offer.price + '₽/ночь';
    mapCardRoomsGuests.innerHTML = cardData[i].offer.rooms + ' комнаты для ' + cardData[i].offer.guests + ' гостей';
    mapCardCheckinCheckout.innerHTML = 'Заезд после ' + cardData[i].offer.checkin + ', выезд до ' + cardData[i].offer.checkout;
    mapCardDescription.innerHTML = cardData[i].offer.description;
    mapCardAvatar.src = cardData[i].authors.avatar;
  }
  return mapCard;
}

function createMapCardType() {
  for (var i = 0; i < cardData.length; i++) {
    var mapCard = similarMapCardTemplate.cloneNode(true);
    var mapCardType = mapCard.querySelector('.popup__type');
    mapCardType.innerHTML = appartmentTypes[cardData[i].offer.type];
  }
  return mapCard;
}

function createMapCardFeature() {
  for (var i = 0; i < cardData.length; i++) {
    var mapCard = similarMapCardTemplate.cloneNode(true);
    var mapCardFeatures = mapCard.querySelector('.popup__features');
    mapCardFeatures.innerHTML = '';
    var feature = document.createElement('li');
    feature.className = 'popup__feature popup__feature--' + cardData[i].offer.features[i];
    mapCardFeatures.appendChild(feature);
  }
  return mapCard;
}

function createMapCardPhotos() {
  for (var i = 0; i < cardData.length; i++) {
    var mapCard = similarMapCardTemplate.cloneNode(true);
    var mapCardPhotos = mapCard.querySelector('.popup__photos');
    for (var y = 0; y < cardData[i].offer.photos.length; y++) {
      mapCardPhotos.innerHTML = '';
      cardPhoto.alt = 'Фотография жилья';
      cardPhoto.width = cardPhotoWidth;
      cardPhoto.height = cardPhotoHeight;
      cardPhoto.className = 'popup__photo';
      cardPhoto.src = cardData[i].offer.photos[y];
      mapCardPhotos.appendChild(cardPhoto);
    }
  }
  return mapCard;
}

function createMapCard() {
  for (var i = 0; i < cardData.length; i++) {
    var mapCard = similarMapCardTemplate.cloneNode(true);
    createMapCardMainInfo();
    createMapCardType();
    createMapCardFeature();
    createMapCardPhotos();
    map.insertBefore(mapCard, mapFilterContainer);
  }
  return mapCard;
}

createCard();
createPin();
createMapCard();
