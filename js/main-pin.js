'use strict';

(function () {
  window.mainElements.mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinBreakPoints = {
      minX: 0,
      maxX: 1200,
      minY: 130,
      maxY: 630,
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.mainElements.mainMapPin.offsetTop - shift.y < pinBreakPoints.minY) {
        window.mainElements.mainMapPin.style.top = pinBreakPoints.minY + 'px';
      } else if (window.mainElements.mainMapPin.offsetTop - shift.y > pinBreakPoints.maxY) {
        window.mainElements.mainMapPin.style.top = pinBreakPoints.maxY + 'px';
      } else {
        window.mainElements.mainMapPin.style.top = (window.mainElements.mainMapPin.offsetTop - shift.y) + 'px';
      }

      if (window.mainElements.mainMapPin.offsetLeft - shift.x < pinBreakPoints.minX) {
        window.mainElements.mainMapPin.style.left = pinBreakPoints.minX + 'px';
      } else if (window.mainElements.mainMapPin.offsetLeft - shift.x > pinBreakPoints.maxX) {
        window.mainElements.mainMapPin.style.left = pinBreakPoints.maxX + 'px';
      } else {
        window.mainElements.mainMapPin.style.left = (window.mainElements.mainMapPin.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDrag) {
          evtDrag.preventDefault();
          window.mainElements.mainMapPin.removeEventListener('click', onClickPreventDefault);
        };
        window.mainElements.mainMapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
