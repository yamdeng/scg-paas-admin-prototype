const Logger = {
  debug: function(message) {
    // eslint-disable-next-line
    console.debug(message);
  },
  info: function(message) {
    // eslint-disable-next-line
    console.info(message);
  },
  warn: function(message) {
    // eslint-disable-next-line
    console.warn(message);
  },
  error: function(message) {
    // 에러정보 전송시 추가 정보로 다음을 전달 : appStore.deviceInfo, appStore.loginInfo, process.env
    // eslint-disable-next-line
    console.error(message);
  }
};

export default Logger;
