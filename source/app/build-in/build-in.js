function stringToHtml(str) {
  var template = document.createElement('div');
  template.innerHTML = str;
  var elements = template.firstChild;
  return elements;
}
function getTemplateURL(name) {
  return $(haijsTemplate[name]);
  // return stringToHtml(haijsTemplate[name]);
}


//action directive 
function viClick(elements, vm) {
  var els = elements.find('[vi-click]');

  _.each(els, function (el) {
    var attr = el.getAttribute('vi-click');
    if (typeof vm[attr] === "function") {
      registerAction(el, 'click', vm[attr]);

    } else {
      throw new Error("Don't exist this function");
    }
    console.log(attr);
  });

}
function viModel(elements, vm) {
  var els = elements.find('[vi-model]');
  _.each(els, function (el) {
    var attr = el.getAttribute('vi-model');
    vm[attr] = vm[attr] || "";
    registerAction(el, 'change', _bind);
    elements.val(vm[attr]);
    console.log(attr);
    function _bind(e,b) {
      vm[attr] = $(e.target).val();
      vm.digest();
    }
  });
}

//DOM manipulation directive 

function viRepeat(elements, vm) {
  var els = elements.find('[vi-repeat]');

  _.each(els, function (el) {
    var attr = el.getAttribute('vi-repeat');
    var innerText = el.innerText;
    el.innerText = vm[attr];
  });
}
function viBind(elements, vm) {
  var els = elements.find('[vi-bind]');

  _.each(els, function (el) {
    var attr = el.getAttribute('vi-bind');
    el.innerText=vm[attr];
  });
}

function registerAction(el, action, func) {
  unregisterAction(el, action, func);
  $(el).on(action, func);
}
function unregisterAction(el, action, func) {
  $(el).off(action, func);
}