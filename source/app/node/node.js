(function () {
  "use strict";
  var STATUS = {

  };

  function Node(element, type, prevNode) {
    var vm = this;
    vm.time = +new Date();
    vm.prevNode = prevNode;

    //define function
    vm.play = play;
    vm.callNextNode = callNextNode;
    vm.setNextNode = setNextNode;

    function init() {

      vm.event = new window.haijs.Event(element, type);
      vm.prevNode.setNextNode(vm);
    }

    function play() {

      callNextNode();
    }
    function callNextNode() {
      vm.nextNode.play();
    }
    //Set next node of previous node
    function setNextNode(node) {
      vm.nextNode = node;
    }
    init();
  }
  window.haijs.Node = Node;

}).call();
