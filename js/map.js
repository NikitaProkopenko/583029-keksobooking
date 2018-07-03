'use strict';

(function () {

  var mapPinParams = {
    widthToCenter: 25,
    height: 70,
  };

  var mainMapPinParams = {
    widthToCenter: 32,
    width: 64,
    height: 84,
    startX: 570,
    startY: 375,
    coordinateX: window.mainElements.mainMapPin.offsetLeft,
    coordinateY: window.mainElements.mainMapPin.offsetTop,
  };

  var AppartmentTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var CARD_PHOTO_PARAMS = {
    width: 45,
    height: 40,
    class: 'popup__photo',
    alt: 'Фотография жилья',
  };

  // Map pin creation

  // function createPin(offerPinObject) {
  //   var mapPins = window.mainElements.map.querySelector('.map__pins');
  //   var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < offerPinObject.length; i++) {
  //     var mapPin = similarPinTemplate.cloneNode(true);
  //     var mapPinImage = mapPin.querySelector('img');
  //     mapPin.style.top = offerPinObject[i].location.y + 'px';
  //     mapPin.style.left = offerPinObject[i].location.x + 'px';

  //     mapPin.addEventListener('click', pinClickHandler.bind(undefined, offerPinObject[i]));

  //     mapPinImage.src = offerPinObject[i].author.avatar;
  //     mapPinImage.alt = offerPinObject[i].offer.title;
  //     fragment.appendChild(mapPin);
  //   }

  //   mapPins.appendChild(fragment);
  //   return mapPins;
  // }

  function pinClickHandler(offer) {
    createMapCardMainInfo(offer);
  }

  function closeCard(card) {
    window.mainElements.map.removeChild(card);
  }

  function removeCardHandler(evt) {
    if (evt.key === window.constants.ESCAPE) {
      var currentCard = window.mainElements.map.querySelector('.map__card');
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

    document.addEventListener('keydown', removeCardHandler);

    newOfferCard.querySelector('.popup__close').addEventListener('click', closeCardHandler);

    var existCard = window.mainElements.map.querySelector('.map__card');

    if (existCard) {
      return window.mainElements.map.replaceChild(newOfferCard, existCard);
    }

    return window.mainElements.map.insertBefore(newOfferCard, window.mainElements.mapFilterContainer);
  }

  function fillAddressCoordinate() {
    var addressField = document.querySelector('#address');
    var addressCoordinate;

    addressCoordinate = (mainMapPinParams.coordinateX + mainMapPinParams.widthToCenter) + ', '
      + (mainMapPinParams.coordinateY - mapPinParams.height);
    addressField.value = addressCoordinate;

    return addressField;
  }

  function preparePage() {
    window.form.disableFormsArray(window.mainElements.pageFieldsetArray);
    fillAddressCoordinate();
  }

  function activatePage() {
    window.form.allowFormArray(window.mainElements.pageFieldsetArray);
    window.mainElements.map.classList.remove('map--faded');
    window.mainElements.adForm.classList.remove('ad-form--disabled');
    window.backend.downloadData(function (data) {
      window.mapPinRender.createPin(data);
    }, function (error) {
      console.log(error);
    });

    window.mainElements.mainMapPin.removeEventListener('mouseup', activatePage);
  }

  window.onload = preparePage();
  window.mainElements.mainMapPin.addEventListener('mouseup', activatePage);

  var sendButton = window.mainElements.adForm.querySelector('.ad-form__submit');

  sendButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    var formData = new FormData(document.querySelector('.ad-form'));

    window.backend.uploadData(formData, function (status) {
      // function hideSuccessWindow() {
      //   successWindow.classList.add('hidden');
      // }
      if (status) {
        var successWindow = document.querySelector('.success');
        successWindow.classList.remove('hidden');
        window.reset.resetForm();
        setTimeout(function () {
          successWindow.classList.add('hidden');
        }, 3000);
      }
    }, function (error) {
      var errorWindow = document.querySelector('.error');
      var errorMessage = errorWindow.querySelector('.error__message');
      errorMessage.innerText = error;
      errorWindow.classList.remove('hidden');
      // function showErrorWindow() {
      //   errorWindow.classList.add('hidden');
      // }
      setTimeout(function () {
        errorWindow.classList.add('hidden');
      }, 3000);
      window.mainElements.mainMapPin.addEventListener('mouseup', window.reset.activatePageAfterReset);
    });
  });

  window.map = {
    fillAddressCoordinate: fillAddressCoordinate,
    mainMapPinParams: mainMapPinParams,
    pinClickHandler: pinClickHandler,
  };

})();
