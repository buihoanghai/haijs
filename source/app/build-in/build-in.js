function stringToHtml(str) {
  var template = document.createElement('div');
  template.innerHTML = str;
  var elements = template.firstChild;
  return elements;
}
function getTemplateURL(name) {
  return stringToHtml(haijsTemplate[name]);
}