// import $ from "jquery";

window.$ = window.jQuery;
var $ = window.$;

console.log("imported", $);

$.fn.getPath = function() {
  // Get path of element
  // borrowed from http://stackoverflow.com/a/2068381/1376627
  if (this.length !== 1) throw new Error("Requires one element.");
  var path,
    node = this;
  while (node.length) {
    var realNode = node[0],
      name = realNode.localName;
    if (!name) break;
    name = name.toLowerCase();

    var parent = node.parent();

    var siblings = parent.children(name);
    if (siblings.length > 1) {
      name += ":eq(" + siblings.index(realNode) + ")";
    }

    path = name + (path ? ">" + path : "");
    node = parent;
  }

  return path.split("html>")[1];
};

export default $;
