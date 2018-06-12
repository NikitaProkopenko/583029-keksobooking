'use strict';

var ads = [
  {
    'authors': {
      'avatar': 'img/avatars/user01.png',
    },
    'offer': {
      'title': 'Большая уютная квартира',
      'address': '150, 150',
      'price': '1000',
      'type': 'palace',
      'rooms': 1,
      'guests': 1,
      'checkin': '12:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ],
    },
    'location': {
      'x': 300,
      'y': 130,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user02.png',
    },
    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '300, 300',
      'price': '2000',
      'type': 'flat',
      'rooms': 2,
      'guests': 2,
      'checkin': '13:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'elevator'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      ],
    },
    'location': {
      'x': 400,
      'y': 240,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user03.png',
    },
    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '400, 600',
      'price': '50000',
      'type': 'house',
      'rooms': 4,
      'guests': 4,
      'checkin': '14:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'elevator', 'washer'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      ],
    },
    'location': {
      'x': 500,
      'y': 540,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user04.png',
    },
    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '450, 500',
      'price': '15000',
      'type': 'bungalo',
      'rooms': 2,
      'guests': 1,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      ],
    },
    'location': {
      'x': 800,
      'y': 320,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user05.png',
    },
    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '530, 400',
      'price': '150000',
      'type': 'house',
      'rooms': 5,
      'guests': 3,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'dishwasher', 'parking'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
      ],
    },
    'location': {
      'x': 640,
      'y': 600,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user06.png',
    },
    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '330, 800',
      'price': '1999',
      'type': 'house',
      'rooms': 2,
      'guests': 1,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['parking'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
      ],
    },
    'location': {
      'x': 340,
      'y': 150,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user07.png',
    },
    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '480, 770',
      'price': '35000',
      'type': 'bungalo',
      'rooms': 1,
      'guests': 1,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['parking', 'wifi', 'washer'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      ],
    },
    'location': {
      'x': 550,
      'y': 270,
    },
  },
  {
    'authors': {
      'avatar': 'img/avatars/user08.png',
    },
    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '880, 370',
      'price': '5000',
      'type': 'bungalo',
      'rooms': 3,
      'guests': 3,
      'checkin': '13:00',
      'checkout': '14:00',
      'features': ['conditioner'],
      'description': '',
      'photos': [
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      ],
    },
    'location': {
      'x': 660,
      'y': 490,
    },
  },
];

var AVATARS = 'img/avatars/user0';
var MIN_AVATARS_COUNT = 1;
var MAX_AVATARS_COUNT = 8;

var TITLES = [
  'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var ADDRESS = ['0', '0'];
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

var obj = {
  'authors': {},
  'offer': {},
  'location': {},
};

function createCard() {
  for (var i = 0; i < CARDS_QUANTITY; i++) {
    cycleCount = i;
    obj.authors.avatar = generateAvatar();
    obj.offer.title = generateTitle();
    obj.offer.address = generateAddress();
    obj.offer.price = generatePrice();
    obj.offer.type = generateType();
    obj.offer.rooms = generateRooms();
    obj.offer.guests = generateGuests();
    obj.offer.checkin = generateCheckin();
    obj.offer.checkout = generateCheckout();
    obj.offer.features = generateFeatures();
    obj.offer.description = DESCRIPTION;
    obj.offer.photos = generatePhotos();
    obj.location.x = generateLocationX();
    obj.location.y = generateLocationY();
    cardData.push(obj);
  }
  
console.log(cardData);
}

createCard();
console.log(cardData);


function generateAvatar() {
  var count = cycleCount;
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
  var offerType = TYPES[cycleCount];
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
  var offerCheckin = CHECKIN[cycleCount];
  return offerCheckin;
}

function generateCheckout() {
  var offerCheckout = CHECKOUT[cycleCount];
  return offerCheckout;
}

function generateFeatures() {
  var maxFeatureCount = FEATURES.length;
  var minFeatureCount = 1;
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

// // Removed fade class
//
// var map = document.querySelector('.map');
// var mapFilterContainer = document.querySelector('.map__filters-container');
// map.classList.remove('map--faded');
//
// // Map pin creation
//
// var mapPins = document.querySelector('.map__pins');
// var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
//
// function mapPinCreate() {
//   mapPin.style = 'left: ' + (ad.location.x - 25) + 'px;' + ' top: ' + (ad.location.y + 70) + 'px;';
//   mapPinImage.src = ad.authors.avatar;
//   mapPinImage.alt = ad.offer.title;
//   return mapPins.appendChild(mapPin);
// }
//
// // Map card template & constructor
//
// var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card.popup');
//
// function mapCardCreate() {
//   mapCardTitle.innerHTML = ad.offer.title;
//   mapCardAddress.innerHTML = ad.offer.address;
//   mapCardPrice.innerHTML = ad.offer.price + '₽/ночь';
//   mapCardRoomsGuests.innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
//   mapCardCheckinCheckout.innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
//   mapCardDescription.innerHTML = ad.offer.description;
//   mapCardAvatar.src = ad.authors.avatar;
//
//   switch (ad.offer.type) {
//     case 'flat':
//       mapCardType.innerHTML = 'Квартира';
//       break;
//     case 'bungalo':
//       mapCardType.innerHTML = 'Бунгало';
//       break;
//     case 'house':
//       mapCardType.innerHTML = 'Дом';
//       break;
//     case 'palace':
//       mapCardType.innerHTML = 'Дворец';
//       break;
//     default:
//       mapCardType.innerHTML = 'Жилье';
//   }
//
//   for (var x = 0; x < ad.offer.features.length; x++) {
//     var feature = document.createElement('li');
//     feature.className = 'popup__feature popup__feature--' + ad.offer.features[x];
//     mapCardFeatures.appendChild(feature);
//   }
//
//   for (var y = 0; y < ad.offer.photos.length; y++) {
//     var photo = document.createElement('img');
//     photo.alt = 'Фотография жилья';
//     photo.width = '45';
//     photo.height = '40';
//     photo.className = 'popup__photo';
//     photo.src = ad.offer.photos[y];
//     mapCardPhotos.appendChild(photo);
//   }
//
//   return mapCard;
// }
//
// // Map card creation cycle
//
// for (var i = 0; i < ads.length; i++) {
//
//   var ad = ads[i];
//
//   var mapPin = similarPinTemplate.cloneNode(true);
//   var mapPinImage = mapPin.querySelector('img');
//   mapPinCreate();
//
//   // Define map card parts
//
//   var mapCard = similarMapCardTemplate.cloneNode(true);
//   var mapCardTitle = mapCard.querySelector('.popup__title');
//   var mapCardAddress = mapCard.querySelector('.popup__text--address');
//   var mapCardPrice = mapCard.querySelector('.popup__text--price');
//   var mapCardType = mapCard.querySelector('.popup__type');
//   var mapCardRoomsGuests = mapCard.querySelector('.popup__text--capacity');
//   var mapCardCheckinCheckout = mapCard.querySelector('.popup__text--time');
//   var mapCardFeatures = mapCard.querySelector('.popup__features');
//   var mapCardDescription = mapCard.querySelector('.popup__description');
//   var mapCardPhotos = mapCard.querySelector('.popup__photos');
//   var mapCardAvatar = mapCard.querySelector('.popup__avatar');
//   mapCardFeatures.innerHTML = '';
//   mapCardPhotos.innerHTML = '';
//
//   mapCardCreate();
//
//   map.insertBefore(mapCard, mapFilterContainer);
// }
