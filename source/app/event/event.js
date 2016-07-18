(function () {
  "use strict";
  var TYPE = {
    click: {
      name: "click",
      trigger:"click"
    },
    input: {
      name:"input"
    }
  };

  function Event(element,type) {
    this.targetElement = element;
    this.type = TYPE[type];
  }

  window.haijs.Event = Event;
}).call();
