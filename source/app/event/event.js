(function () {
  "use strict";
  var DEFAULT_FACTORY_TYPE = 'Click';
  function Event(event) {
    var vm = this;
    vm.event = event;

    Event.prototype.play = function () {

    };
  }
  Event.factory = function factory(type, event) {
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
      Event[constr].prototype = new Event(event);
      // create a new instance
      var e = new Event[constr]();
      // optionally call some methods and then return...
      return e;
    };

    // define specific event makers
    Event.Click = function () {
      var vm = this;
      this.play = function () {
        var elem = vm.event.target;
        console.log('click');
        $(elem).trigger('click');
      };
    };
    Event.Input = function () {
      this.play = function () {

      };
    };

  window.haijs.Event = Event;
}).call();
