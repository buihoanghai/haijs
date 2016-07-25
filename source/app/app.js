(function () {
  'use strict';
  window.scen = {};
  var DEFAULT_CHAR_CODE_START = 17;// "keyQ"
  var DEFAULT_CHAR_CODE_STOP = 25;// "keyY"
  var DEFAULT_CHAR_CODE_PLAY_BACK = 2;// "keyB"
  function startRecord() {
    console.log('start record');
    scen = new haijs.Scenario();
    scen.startRecord();
  }
  function stopRecord() {
    console.log('stop record');
    if (scen.stopRecord) {
      scen.stopRecord();
    }
  }
  function playBackRecord() {
    stopRecord();
    console.log('play back record');
    if (scen.playBack) {
      scen.playBack();
    }
  }
  window.haijs = window.haijs || {};
  function setInitStart() {
    document.onkeypress = checkKeyPress;
  }

  function checkKeyPress(e) {
    if (e.ctrlKey) {
      switch (e.charCode) {
        case DEFAULT_CHAR_CODE_START:
          startRecord();
          break;
        case DEFAULT_CHAR_CODE_STOP:
          stopRecord();
          break;
        case DEFAULT_CHAR_CODE_PLAY_BACK:
          playBackRecord();
          break;
      }
    }
  }
  function activate() {
    setInitStart();
  }

  activate();

}).call();