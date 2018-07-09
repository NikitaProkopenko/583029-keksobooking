'use strict';

(function () {

  function createPin(offerPinObject) {
    window.reset.removePin();
    var slicedOffers = offerPinObject.slice(0, window.constants.MAX_PINS_COUNT);
    var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < slicedOffers.length; i++) {
      var mapPin = similarPinTemplate.cloneNode(true);
      var mapPinImage = mapPin.querySelector('img');
      mapPin.style.top = slicedOffers[i].location.y + 'px';
      mapPin.style.left = slicedOffers[i].location.x + 'px';

      mapPin.addEventListener('click', window.mapPinRender.pinClickHandler.bind(undefined, slicedOffers[i], mapPin));

      mapPinImage.src = slicedOffers[i].author.avatar;
      mapPinImage.alt = slicedOffers[i].offer.title;
      fragment.appendChild(mapPin);
    }

    window.mainElements.mapPins.appendChild(fragment);
    return window.mainElements.mapPins;
  }

  function pinClickHandler(offer, mapPin) {
    window.mapCardRender.createMapCardMainInfo(offer);
    removePinActive();
    mapPin.classList.add('map__pin--active');
  }

  function removePinActive() {
    var activePin = window.mainElements.mapPins.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  window.mapPinRender = {
    createPin: createPin,
    pinClickHandler: pinClickHandler,
    removePinActive: removePinActive,
  };

})();
