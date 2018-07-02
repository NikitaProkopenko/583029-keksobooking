'use strict';

(function () {

  var adFormTitle = window.mainElements.adForm.querySelector('#title');
  var adFormPrice = window.mainElements.adForm.querySelector('#price');
  var adFormType = window.mainElements.adForm.querySelector('#type');
  var adFormTimeIn = window.mainElements.adForm.querySelector('#timein');
  var adFormTimeOut = window.mainElements.adForm.querySelector('#timeout');
  var adFormRoomNumber = window.mainElements.adForm.querySelector('#room_number');
  var adFormCapacity = window.mainElements.adForm.querySelector('#capacity');
  var invalidMarker = 'border: 3px solid red';

  adFormTitle.addEventListener('invalid', function (evt) {
    var target = evt.target;

    if (target.validity.tooShort) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30 символов.');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Заголовок состоит максимум из 100 символов.');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле.');
    } else {
      target.setCustomValidity('');
      target.style = '';
    }
  });

  adFormPrice.addEventListener('invalid', function (evt) {
    var target = evt.target;

    if (target.value > window.constants.MAX_APPARTMENT_PRICE) {
      target.setCustomValidity('Цена не должна превышать' + window.constants.MAX_APPARTMENT_PRICE + ' руб.');
      target.style = invalidMarker;
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле.');
      target.style = invalidMarker;
    } else if (target.value < target.min) {
      target.setCustomValidity('Минимальная цена ' + target.min + ' руб.');
    } else {
      target.setCustomValidity('');
      target.style = '';
    }
  });

  adFormPrice.placeholder = window.constants.MIN_PRICE_PARAMS.flat;

  adFormType.addEventListener('change', function (evt) {
    var target = evt.target;
    var price = adFormPrice;

    switch (target.value) {
      case window.constants.AppartmentPriceTypes.bungalo:
        price.min = window.constants.MIN_PRICE_PARAMS.bungalo;
        price.placeholder = window.constants.MIN_PRICE_PARAMS.bungalo;
        break;
      case window.constants.AppartmentPriceTypes.flat:
        price.min = window.constants.MIN_PRICE_PARAMS.flat;
        price.placeholder = window.constants.MIN_PRICE_PARAMS.flat;
        break;
      case window.constants.AppartmentPriceTypes.house:
        price.min = window.constants.MIN_PRICE_PARAMS.house;
        price.placeholder = window.constants.MIN_PRICE_PARAMS.house;
        break;
      case window.constants.AppartmentPriceTypes.palace:
        price.min = window.constants.MIN_PRICE_PARAMS.palace;
        price.placeholder = window.constants.MIN_PRICE_PARAMS.palace;
        break;
      default:
        price.min = window.constants.MIN_PRICE_PARAMS.flat;
        price.placeholder = window.constants.MIN_PRICE_PARAMS.flat;
    }
  });

  adFormTimeIn.addEventListener('change', function (evt) {
    var target = evt.target;
    adFormTimeOut.value = target.value;
  });

  adFormTimeOut.addEventListener('change', function (evt) {
    var target = evt.target;
    adFormTimeIn.value = target.value;
  });

  function disableFormsArray(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', '');
    }
    return array;
  }

  function allowFormArray(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled');
    }
    return array;
  }

  function setCapacity(selectedRoom) {
    var capacities = adFormCapacity.querySelectorAll('option');

    for (var i = 0; i < capacities.length; i++) {
      capacities[i].disabled = !window.constants.RoomCapacityDict[selectedRoom].includes(capacities[i].value);
    }

    if (adFormCapacity.options[adFormCapacity.selectedIndex].disabled) {
      adFormCapacity.value = window.constants.RoomCapacityDict[selectedRoom][0];
    }
  }

  function formRoomNumberHandler(evt) {
    setCapacity(evt.currentTarget.value);
  }

  setCapacity(window.constants.DEFAULT_SELECTED_ROOM);

  adFormRoomNumber.addEventListener('change', formRoomNumberHandler);

  adFormCapacity.addEventListener('change', function (evt) {
    var target = evt.target;
    if (adFormRoomNumber.value !== target.value) {
      adFormRoomNumber.style = invalidMarker;
    } else {
      adFormRoomNumber.style = '';
    }
  });

  window.form = {
    disableFormsArray: disableFormsArray,
    allowFormArray: allowFormArray,
  };

})();
