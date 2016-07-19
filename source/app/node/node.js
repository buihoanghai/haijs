(function () {
  "use strict";
  var STATUS = {

  };

  function Node(e, type, prevNode) {
    var vm = this;
    vm.time = +new Date();
    vm.prevNode = prevNode;

    //define function
    vm.play = play;
    vm.callNextNode = callNextNode;
    vm.setNextNode = setNextNode;

    function init() {

      vm.event = new window.haijs.Event(e, type);
      if (vm.prevNode) { // if dont exist prevNode this node is first node
        vm.prevNode.setNextNode(vm);
      }
    }

    function play(time) {
      var timeout = time - vm.time;
      console.log('play :' + timeout);
      setTimeout(function () {
        vm.event.play();
        callNextNode();
      }, timeout);
    }
    function callNextNode() {
      vm.nextNode.play(vm.time);
    }
    //Set next node of previous node
    function setNextNode(node) {
      vm.nextNode = node;
    }
    init();
  }
  window.haijs.Node = Node;

}).call();
