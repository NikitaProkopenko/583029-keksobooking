'use strict';

(function () {

  var URL_DOWNLOAD_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD_DATA = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var HttpResponseCodes = {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500
  };

  var createXHR = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case HttpResponseCodes.NOT_FOUND:
          errorHandler('Ресурс не найден');
          break;
        case HttpResponseCodes.SUCCESS:
          loadHandler(xhr.response);
          break;
        case HttpResponseCodes.SERVER_ERROR:
          errorHandler('Ошибка сервера');
          break;
        default:
          errorHandler('Неизвестный статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Возникла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за отведенное время.');
    });

    return xhr;
  };

  function downloadData(loadHandler, errorHandler) {
    var xhr = createXHR(loadHandler, errorHandler);
    xhr.open('GET', URL_DOWNLOAD_DATA);
    xhr.send();
  }

  function uploadData(data, loadHandler, errorHandler) {
    var xhr = createXHR(loadHandler, errorHandler);
    xhr.open('POST', URL_UPLOAD_DATA);
    xhr.send(data);
  }

  window.backend = {
    downloadData: downloadData,
    uploadData: uploadData,
  };

})();
