(function () {
  'use strict';
  function VietJs(templateUrl, vm) {
    vm.id = haijs.vietCount++;
    vm.scope = scope;
    vm.digest = digest;

    function active() {
      createElement();
      digest();
    }
    function digest() {
      console.log('digest');
      _viClick(vm.element, vm);
      _viModel(vm.element, vm);
      _viBind(vm.element, vm);
      _viRepeat(vm.element, vm);
    }
    active();
    function createElement() {
      vm.element = _getTemplateURL(templateUrl);
    }
    //build in 
    function _getTemplateURL(name) {
      return $(haijsTemplate[name]);
    }

    //action directive 
    function _viClick(elements, vm) {
      var els = elements.find('[vi-click]');

      _.each(els, function (el) {
        var attr = el.getAttribute('vi-click');
        if (typeof vm[attr] === "function") {
          _registerAction(el, 'click', vm[attr]);

        } else {
          throw new Error("Don't exist this function");
        }
        console.log(attr);
      });

    }
    function _viModel(elements, vm) {
      var els = elements.find('[vi-model]');
      _.each(els, function (el) {
        var attr = el.getAttribute('vi-model');
        vm[attr] = vm[attr] || "";
        _registerAction(el, 'change', _bind);
        elements.val(vm[attr]);
        console.log(attr);
        function _bind(e, b) {
          vm[attr] = $(e.target).val();
          vm.digest();
        }
      });
    }

    //DOM manipulation directive 

    function _viRepeat(elements, vm) {
      var els = elements.find('[vi-repeat]');

      _.each(els, function (el) {
        var attr = el.getAttribute('vi-repeat');
        var innerText = el.innerText;
        el.innerText = vm[attr];
      });
    }
    function _viBind(elements, vm) {
      var els = elements.find('[vi-bind]');

      _.each(els, function (el) {
        var attr = el.getAttribute('vi-bind');
        el.innerText = vm[attr];
      });
    }

    function _registerAction(el, action, func) {
      _unregisterAction(el, action, func);
      $(el).on(action, func);
    }
    function _unregisterAction(el, action, func) {
      $(el).off(action, func);
    }
  }
  window.VietJs = VietJs;
}).call();