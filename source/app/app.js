(function () {
  'use strict';
  function startHaijs() {
    var scen = new haijs.Scenario();
    scen.startRecord();
  }

  window.haijs = window.haijs || {};
  haijs.startHaijs = startHaijs;
}).call();