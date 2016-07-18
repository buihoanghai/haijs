(function () {
  'use strict';
  var STATUS = [""];
  function Scenario() {
    var vm = this;
    vm.time = +new Date();
    vm.firstNode = {};
    vm.nodes = [];
    //define function
    vm.record = record;
    vm.stopRecord = stopRecord;
    vm.playBack = playBack;
  }
  function init() { 

  }
  function record() {
    document.onclick = _onDocumentClick;

  }
  function stopRecord() {

  }
  function playBack() {

  }
  function _onDocumentClick(element, b, c) {
    _createNode(element, 'click')
  }
  function _createNode(elem, type) {
    var nodes = vm.nodes;
    var prevNode = nodes[nodes.length - 1];
    var node = new haijs.Node(element, type, prevNode);
    vm.nodes.push(node);
  }

  window.haijs.Scenario = Scenario;
}).call();
