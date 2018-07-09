'use strict';

(function () {

  var AppartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  function createMapCardFeature(offerFeatureObject) {
    var similarFeature = document.createElement('li');
    var featuresFragment = document.createDocumentFragment();

    for (var x = 0; x < offerFeatureObject.offer.features.length; x++) {
      var feature = similarFeature.cloneNode(true);
      feature.className = 'popup__feature popup__feature--' + offerFeatureObject.offer.features[x];
      featuresFragment.appendChild(feature);
    }
    return featuresFragment;
  }

  function createMapCardPhotos(offerPhotoObject) {
    var similarPhoto = document.createElement('img');
    var photosFragment = document.createDocumentFragment();

    for (var y = 0; y < offerPhotoObject.offer.photos.length; y++) {
      var photo = similarPhoto.cloneNode(true);
      photo.alt = window.constants.CARD_PHOTO_PARAMETERS.alt;
      photo.width = window.constants.CARD_PHOTO_PARAMETERS.width;
      photo.height = window.constants.CARD_PHOTO_PARAMETERS.height;
      photo.className = window.constants.CARD_PHOTO_PARAMETERS.class;
      photo.src = offerPhotoObject.offer.photos[y];
      photosFragment.appendChild(photo);
    }
    return photosFragment;
  }

  function createMapCardMainInfo(offerObject) {
    var similarMapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
    var newOfferCard = similarMapCardTemplate.cloneNode(true);

    newOfferCard.querySelector('.popup__avatar').src = offerObject.author.avatar;
    newOfferCard.querySelector('.popup__text--address').textContent = offerObject.offer.address;
    newOfferCard.querySelector('.popup__title').textContent = offerObject.offer.title;
    newOfferCard.querySelector('.popup__text--price').textContent = offerObject.offer.price + '₽/ночь';
    newOfferCard.querySelector('.popup__text--capacity').textContent = offerObject.offer.rooms +
      ' комнаты для ' + offerObject.offer.guests + ' гостей';
    newOfferCard.querySelector('.popup__text--time').textContent = 'Заезд после ' +
      offerObject.offer.checkin + ', выезд до ' + offerObject.offer.checkout;
    newOfferCard.querySelector('.popup__description').textContent = offerObject.offer.description;
    newOfferCard.querySelector('.popup__type').textContent = AppartmentTypes[offerObject.offer.type];

    var feauturesElement = newOfferCard.querySelector('.popup__features');
    feauturesElement.innerHTML = '';

    var photosElement = newOfferCard.querySelector('.popup__photos');
    photosElement.innerHTML = '';

    var featuresFragment = createMapCardFeature(offerObject);
    feauturesElement.appendChild(featuresFragment);

    var photosFragment = createMapCardPhotos(offerObject);
    photosElement.appendChild(photosFragment);

    document.addEventListener('keydown', onMapCardRemove);

    newOfferCard.querySelector('.popup__close').addEventListener('click', closeCardHandler);

    var existCard = window.mainElements.map.querySelector('.map__card');

    if (existCard) {
      return window.mainElements.map.replaceChild(newOfferCard, existCard);
    }

    return window.mainElements.map.insertBefore(newOfferCard, window.mainElements.mapFilterContainer);
  }

  function closeCard(card) {
    window.mapPinRender.removePinActive();
    window.mainElements.map.removeChild(card);
  }

  function onMapCardRemove(evt) {
    if (evt.key === window.constants.ESCAPE) {
      var currentCard = window.mainElements.map.querySelector('.map__card');
      if (currentCard) {
        closeCard(currentCard);
      }
      document.removeEventListener('keydown', onMapCardRemove);
    }
  }

  function closeCardHandler(evt) {
    closeCard(evt.currentTarget.parentNode);
  }

  window.mapCardRender = {
    createMapCardMainInfo: createMapCardMainInfo,
  };

})();
