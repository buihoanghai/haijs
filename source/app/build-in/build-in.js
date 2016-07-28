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

function viClick(elements, vm) {
  var els = elements.find('[vi-click]');

  _.each(els, function (el) {
    var attr = el.getAttribute('vi-click');
    if (typeof vm[attr] == "function") {
      registerAction(el, 'click', vm[attr]);

    } else {
      throw new Error("Don't exist this function");
    }
    console.log(attr);
  });

}
function registerAction(el, action, func) {
  $(el).on(action, func);
}