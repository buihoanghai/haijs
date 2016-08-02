(function () {
  'use strict';
  var STATUS = [""];
  var templateUrl = "scenario/_tpl/scenario";
  function Scenario() {
    var vm = this;
    vm.time = +new Date();
    vm.firstNode = undefined;
    vm.digest = digest;
    vm.nodes = [];
    //define function
    vm.startRecord = startRecord;
    vm.stopRecord = stopRecord;
    vm.playBack = playBack;
    vm.done = done;
    function init() {
      createElement();
      digest();
    }
    init();

    function createElement() {
      vm.element = getTemplateURL(templateUrl);
      $(document.body).append(vm.element);
    }
    function startRecord() {
      _addListener();
    }

    function stopRecord() {
      _removeListener();
    }
    function _addListener() {
      document.onclick = _onDocumentClick;

    }
    function _removeListener() {
      document.onclick = undefined;
    }

    function playBack() {
      stopRecord();
      if (vm.firstNode) {
        vm.firstNode.play(vm.time, done);
      }
    }
    function done() {
      console.log('done');
      var func = new Function(" return " + vm.target);
      if (func()) {
        console.log('success');
      } else {
        console.log('unsuccess');
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
    function digest() {
      console.log('digest');
      viClick(vm.element, vm);
      viModel(vm.element, vm);
      viBind(vm.element, vm);
    }
  }


  window.haijs.Scenario = Scenario;
}).call();
