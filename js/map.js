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

var map = document.querySelector('.map');
var mapFilterContainer = document.querySelector('.map__filters-container');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card.popup');

var featureCount = 6;

for (var i = 0; i < 8; i++) {
  var mapPin = similarPinTemplate.cloneNode(true);
  var ad = ads[i];
  var mapPinImage = mapPin.querySelector('img');
  
  mapPin.style = 'left: ' + (ad.location.x - 20) + 'px;' + ' top: ' + (ad.location.y + 40) + 'px;';
  mapPinImage.src = ad.authors.avatar;
  mapPinImage.alt = ad.offer.title;
  mapPins.appendChild(mapPin);
  
  var mapCard = similarMapCardTemplate.cloneNode(true);
  var mapCardTitle = mapCard.querySelector('.popup__title');
  var mapCardAddress = mapCard.querySelector('.popup__text--address');
  var mapCardPrice = mapCard.querySelector('.popup__text--price');
  var mapCardType = mapCard.querySelector('.popup__type');
  var mapCardRoomsGuests = mapCard.querySelector('.popup__text--capacity');
  var mapCardCheckinCheckout = mapCard.querySelector('.popup__text--time');
  var mapCardFeatures = mapCard.querySelector('.popup__features');
  
  
  mapCardTitle.innerHTML = ad.offer.title;
  mapCardAddress.innerHTML = ad.offer.address;
  mapCardPrice.innerHTML = ad.offer.price + '₽/ночь';
  mapCardRoomsGuests.innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCardCheckinCheckout.innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  
  switch (ad.offer.type) {
    case 'flat':
      mapCardType.innerHTML = 'Квартира';
      break;
    case 'bungalo':
      mapCardType.innerHTML = 'Бунгало';
      break;
    case 'house':
      mapCardType.innerHTML = 'Дом';
      break;
    case 'palace':
      mapCardType.innerHTML = 'Дворец';
      break;
    default:
      mapCardType.innerHTML = 'Жилье';
  }
  
  for (var x = 0; x < ad.offer.features.length; x++) {
    var mapCardFeature = mapCard.querySelector('.popup__feature');
    mapCardFeature.classList.add('.popup__feature' + '--' + ad.offer.features[x]);
    mapCardFeatures.appendChild(mapCardFeature);
  }
  
  map.insertBefore(mapCard, mapFilterContainer);
}

console.log(map);
