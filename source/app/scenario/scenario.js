(function () {
  'use strict';
  var STATUS = [""];
  function Scenario() {
    var vm = this;
    vm.time = +new Date();
    vm.firstNode = undefined;
    vm.nodes = [];
    //define function
    vm.startRecord = startRecord;
    vm.stopRecord = stopRecord;
    vm.playBack = playBack;
    function init() {

    }
    function startRecord() {
      document.onclick = _onDocumentClick;

    }
    function stopRecord() {
      document.onclick = undefined;
    }
    function playBack() {
      if (vm.firstNode) {
        vm.firstNode.play(vm.time);
      }
    }
    function _onDocumentClick(e) {
      console.log(e);
      _createNode(e);
    }
    function _createNode(e, type) {
      var nodes = vm.nodes;
      var prevNode = nodes[nodes.length - 1];
      var node = new haijs.Node(e, type, prevNode);
      _setFirstNode(node);
      vm.nodes.push(node);
    }
    function _setFirstNode(node) {
      vm.firstNode = vm.firstNode || node;

    }
  } 
 

  window.haijs.Scenario = Scenario;
}).call();
