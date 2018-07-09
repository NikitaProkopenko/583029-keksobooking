'use strict';

(function () {

  var AppartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

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
      photo.alt = window.constants.CARD_PHOTO_PARAMETERS.alt;
      photo.width = window.constants.CARD_PHOTO_PARAMETERS.width;
      photo.height = window.constants.CARD_PHOTO_PARAMETERS.height;
      photo.className = window.constants.CARD_PHOTO_PARAMETERS.class;
      photo.src = offerPhotoObject.offer.photos[y];
      var photoList = offerPhotoCard.querySelector('.popup__photos').appendChild(photo);
    }
    return photoList;
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
    newOfferCard.querySelector('.popup__features').innerHTML = '';
    newOfferCard.querySelector('.popup__photos').innerHTML = '';

    createMapCardFeature(offerObject, newOfferCard);
    createMapCardPhotos(offerObject, newOfferCard);

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

      if (window.mainElements.currentCard) {
        closeCard(window.mainElements.currentCard);
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
