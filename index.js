'use strict';

const Orientation = require('react-native').NativeModules.Orientation;
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const listeners = {};
const deviceEvent = "orientationDidChange";
let currentCookie = 1;

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
    const cookie = currentCookie++;
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
    const cb = listeners[key];
    cb && cb(body.orientation);
  });
});
