(function () {
  'use strict';
  function VietJs(templateUrl, scope) {
    var vm = this;
    vm.templateUrl = templateUrl;
    vm.scope = scope;
    function createDOM() {
      var element = getTemplateURL(templateUrl);
      document.body.appendChild(element);
      return element;
    }
    function active() {
      vm.element = createDOM();
    }
  }

  window.VietJs = VietJs;
}).call();