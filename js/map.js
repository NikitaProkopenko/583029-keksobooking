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

// TODO Create object with const
var MAP_PIN_WIDTH_CENTER = 25;
var MAP_PIN_HEIGHT = 70;

var cycleCount;
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

var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card.popup');
// TODO Create object with const
var cardPhotoWidth = 45;
var cardPhotoHeight = 40;
var cardPhoto = document.createElement('img');

// Test data generation

function generateAvatar(avatarNumber) {
  return AVATARS + avatarNumber + '.png';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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
    cardDataItem.authors.avatar = generateAvatar(i);
    cardDataItem.offer.title = TITLES[getRandomInt(0, TITLES.length - 1)];
    cardDataItem.offer.address = generateAddress();
    cardDataItem.offer.price = getRandomInt(1000, 1000000);
    cardDataItem.offer.type = generateType(); // См.стр. 160
    cardDataItem.offer.rooms = generateRooms(); // аналогично
    cardDataItem.offer.guests = generateGuests(); // аналогично
    cardDataItem.offer.checkin = generateCheckin(); // аналогично
    cardDataItem.offer.checkout = generateCheckout();
    cardDataItem.offer.features = generateFeatures(); // getRandomElementsFromCollection
    cardDataItem.offer.description = DESCRIPTION;
    cardDataItem.offer.photos = generatePhotos();  // Посмотри алгоритм Фишера-Йетса (https://webformyself.com/sortirovka-massivov-v-javascript/)
    cardDataItem.location.x = generateLocationX(); // getRandomInt
    cardDataItem.location.y = generateLocationY(); // getRandomInt
    cardData.push(cardDataItem);
  }
  return cardData;
}

function getRandomElementsFromCollection (count, sourceCollection) {
 // Цикл
  // Получение элементов
  // Возвращать массив
}

// getRandomElementsFromCollection(2, PHOTOS)

// Map pin creation

function createPin() {
  // TODO Посмотреть document.createDocumentFragment();
  // TODO Список пинов для рендеринга передавать через параметр
   for (var i = 0; i < cardData.length; i++) {
    var mapPin = similarPinTemplate.cloneNode(true);
    var mapPinImage = mapPin.querySelector('img');

    // TODO. Расчет координат в создание объекта
    mapPin.style = 'left: ' + (cardData[i].location.x - MAP_PIN_WIDTH_CENTER) + 'px;' + ' top: ' + (cardData[i].location.y + MAP_PIN_HEIGHT) + 'px;';

    // TODO. Используй style в объектном стиле
    // mapPin.style.top = location.top + 'px';
    // mapPin.style.left = location.x + 'px';

    mapPinImage.src = cardData[i].authors.avatar;
    mapPinImage.alt = cardData[i].offer.title;
    mapPins.appendChild(mapPin);
  }
  return mapPins;
}

// Map card template creation

function createMapCardMainInfo() {
  // TODO. Избавиться от цикла. Формируем только одну
  // TODO. В параметр передаем один offerObject.

  // var newOfferCard = template.querySelector('.map__card');
  // newOfferCard.querySelector('.popup__avatar').src =offerObject.author.avatar;
  // newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.title;

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
    mapCardType.innerHTML = AppartmentTypes[cardData[i].offer.type];
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

// TODO. Проверить вызов

var allPins = generateObjects(); // Массив из 8 пинов
createCard(allPins[0]);
