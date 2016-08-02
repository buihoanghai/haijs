(function () {
  'use strict';
  window.haijsTemplate = window.haijsTemplate || {};
  window.scen = {};
  var HOTKEY_CHAR_CODE_START = 17;// "keyQ"
  var HOTKEY_CHAR_CODE_STOP = 25;// "keyY"
  var HOTKEY_CHAR_CODE_PLAY_BACK = 2;// "keyB"
 
  function addDomElement() {
    var element = getTemplateURL('haijs');
    document.body.appendChild(element);
  }
 
  function setInitStart() {
    document.onkeypress = checkKeyPress;
  }

  function checkKeyPress(e) {
    if (e.ctrlKey) {
      switch (e.charCode) {
        case HOTKEY_CHAR_CODE_START:
          startRecord();
          break;
        case HOTKEY_CHAR_CODE_STOP:
          stopRecord();
          break;
        case HOTKEY_CHAR_CODE_PLAY_BACK:
          playBackRecord();
          break;
      }
    }
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
  function startRecord() {
    console.log('start record');
    scen = new haijs.Scenario();
    scen.startRecord();
  }
  function activate() {
    setInitStart();
  }

  activate();
  window.haijs = window.haijs || {};
  haijs.vietCount = 0;
  haijs.addDomElement = addDomElement;
}).call();