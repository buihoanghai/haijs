(function () {
  "use strict";
  var DEFAULT_FACTORY_TYPE = 'Click';
  function Event(event, type) {
    var vm = this;
    vm.event = event;

    function init(type) {
      return factory(type);
    }
    Event.prototype.play = function () {

    };
    function factory(type) {
      var constr = type || DEFAULT_FACTORY_TYPE;
      // error if the constructor doesn't exist
      if (typeof Event[constr] !== "function") {
        throw {
          name: "Error",
          message: constr + " doesn't exist"
        };
      }
      // at this point the constructor is known to exist
      // let's have it inherit the parent but only once
      if (typeof Event[constr].prototype.drive !== "function") {
        Event[constr].prototype = new Event();
      }
      // create a new instance
      var event = new Event[constr]();
      // optionally call some methods and then return...
      return event;
    };

    // define specific event makers
    Event.Click = function () {
      this.play = function () {
        var elem = event.targetElement;
        console.log('click');
        $(elem).trigger('click');
      };
    };
    Event.Input = function () {
      this.play = function () {

      };
    };
    return init();
  }

  window.haijs.Event = Event;
}).call();
