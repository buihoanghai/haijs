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

      vm.event = haijs.Event.factory(type, e);
      if (vm.prevNode) { // if dont exist prevNode this node is first node
        vm.prevNode.setNextNode(vm);
      }
    }

    function play(time, done) {
      var timeout = vm.time - time;
      console.log('play :' + timeout);
      _.delay(function () {
        vm.event.play();
        callNextNode(done);
      }, timeout);
    }
    function callNextNode(done) {
      if (vm.nextNode) {
        vm.nextNode.play(vm.time, done);
      } else {
        _.delay(done, 100);
        console.log('done');
      }
    }
    //Set next node of previous node
    function setNextNode(node) {
      vm.nextNode = node;
    }
    init();
  }
  haijs.Node = Node;

}).call();
