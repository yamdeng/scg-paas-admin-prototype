import Config from '../config/Config';
import AppHistory from '../utils/AppHistory';

function convertEmptyValue(value) {
  if (value === undefined || value === null || value === '') {
    return Config.defaultEmptyValue;
  } else {
    return value;
  }
}

function checkAuthByUrl(url) {
  if (url && url.indexOf('accordion-b') !== -1) {
    AppHistory.push('/error-auth');
  }
}

function getQueryStringValue(key) {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
}

function copyToClipboard(id) {
  let textArea = document.getElementById(id);
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    var range, selection;
    range = document.createRange();
    range.selectNodeContents(textArea);
    selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    textArea.setSelectionRange(0, 999999);
  } else {
    textArea.select();
  }
  document.execCommand('copy');
  alert('복사되었습니다');
}

function saveInfoToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getInfoByLocalStorage(key) {
  let jsonString = localStorage.getItem(key);
  if (jsonString) {
    return JSON.parse(jsonString);
  } else {
    return null;
  }
}

function removeInfoByLocalStorage(key) {
  localStorage.removeItem(key);
}

const Helper = {
  convertEmptyValue: convertEmptyValue,
  checkAuthByUrl: checkAuthByUrl,
  getQueryStringValue: getQueryStringValue,
  copyToClipboard: copyToClipboard,
  saveInfoToLocalStorage: saveInfoToLocalStorage,
  getInfoByLocalStorage: getInfoByLocalStorage,
  removeInfoByLocalStorage: removeInfoByLocalStorage
};

export default Helper;
