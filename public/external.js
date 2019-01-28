// eslint-disable-next-line
function dispatchEventToApp(eventName, eventData) {
  $(window).trigger(eventName, [eventData]);
}
