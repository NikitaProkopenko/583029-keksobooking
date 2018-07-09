'use strict';

(function () {
  window.mainElements.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var updatedCoordinateX;
    var updatedCoordinateY;

    function updateAddressCoordinate(x, y) {
      window.mainElements.addressField.value = x + ', ' + y;
    }

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.mainElements.mainMapPin.offsetTop - shift.y < window.constants.PIN_BREAK_POINTS.minY) {
        window.mainElements.mainMapPin.style.top = window.constants.PIN_BREAK_POINTS.minY + 'px';
        updatedCoordinateY = window.constants.PIN_BREAK_POINTS.minY;
      } else if (window.mainElements.mainMapPin.offsetTop - shift.y > window.constants.PIN_BREAK_POINTS.maxY) {
        window.mainElements.mainMapPin.style.top = window.constants.PIN_BREAK_POINTS.maxY + 'px';
        updatedCoordinateY = window.constants.PIN_BREAK_POINTS.maxY;
      } else {
        window.mainElements.mainMapPin.style.top = (window.mainElements.mainMapPin.offsetTop - shift.y) + 'px';
        updatedCoordinateY = window.mainElements.mainMapPin.offsetTop - shift.y;
      }

      if (window.mainElements.mainMapPin.offsetLeft - shift.x < window.constants.PIN_BREAK_POINTS.minX) {
        window.mainElements.mainMapPin.style.left = window.constants.PIN_BREAK_POINTS.minX + 'px';
        updatedCoordinateX = window.constants.PIN_BREAK_POINTS.minX;
      } else if (window.mainElements.mainMapPin.offsetLeft - shift.x > window.constants.PIN_BREAK_POINTS.maxX) {
        window.mainElements.mainMapPin.style.left = window.constants.PIN_BREAK_POINTS.maxX + 'px';
        updatedCoordinateX = window.constants.PIN_BREAK_POINTS.maxX;
      } else {
        window.mainElements.mainMapPin.style.left = (window.mainElements.mainMapPin.offsetLeft - shift.x) + 'px';
        updatedCoordinateX = window.mainElements.mainMapPin.offsetLeft - shift.x;
      }

      updateAddressCoordinate(updatedCoordinateX, updatedCoordinateY);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      window.map.activatePage();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
