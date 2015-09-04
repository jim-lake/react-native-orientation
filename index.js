'use strict';

var Orientation = require('react-native').NativeModules.Orientation;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var listeners = {};
var deviceEvent = "orientationDidChange";
var currentCookie = 1;

module.exports = {
  lockToPortrait() {
    Orientation.lockToPortrait();
  },
  lockToLandscape() {
    Orientation.lockToLandscape();
  },
  unlockAllOrientations() {
    Orientation.unlockAllOrientations();
  },
  addOrientationListener(cb) {
    var cookie = currentCookie++;
    listeners[cookie] = cb;
    return cookie;
  },
  removeOrientationListener(cookie) {
    delete listeners[cookie];
  }
}

RCTDeviceEventEmitter.addListener(deviceEvent,(body) =>
{
  Object.keys(listeners).forEach((key) => {
    var cb = listeners[key];
    cb && cb(body.orientation);
  });
});
