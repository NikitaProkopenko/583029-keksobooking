'use strict';

(function () {
  function createPin(offerPinObject) {
    var mapPins = window.mainElements.map.querySelector('.map__pins');
    var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offerPinObject.length; i++) {
      var mapPin = similarPinTemplate.cloneNode(true);
      var mapPinImage = mapPin.querySelector('img');
      mapPin.style.top = offerPinObject[i].location.y + 'px';
      mapPin.style.left = offerPinObject[i].location.x + 'px';

      mapPin.addEventListener('click', window.map.pinClickHandler.bind(undefined, offerPinObject[i]));

      mapPinImage.src = offerPinObject[i].author.avatar;
      mapPinImage.alt = offerPinObject[i].offer.title;
      fragment.appendChild(mapPin);
    }

    mapPins.appendChild(fragment);
    return mapPins;
  }

  window.mapPinRender = {
    createPin: createPin,
  };

})();
