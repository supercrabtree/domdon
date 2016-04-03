
/*
 * A wrapper around document.querySelectorAll
 *
 * By default a DOM() call will return null if no elements where found, the raw
 * Element if one is found, or an Array (not NodeList) of Elements if more than
 * one is found.
 *
 *
 * Usage
 * -----
 * DOM('#nav-stack') => element with id nav-stack
 * DOM('#nav-stack li') => all lis in the element with the id nav-stack
 * DOM('#nav-stack li .bullet') => all bullets inside lis inside nav-stack
 *
 *
 * A call to DOM() can also take two parameters. If used in this way the first
 * parameter is the root element to start the search from.
 *
 * var navStack = DOM('#nav-stack') => element with id nav-stack
 * DOM(nav-stack, 'li, .bullet') => all bullets and lis inside nav-stack
 *
 *
 * If used in this way the first parameter can also be a selector, for instance
 * the above two statements could be written:
 *
 * DOM('#nav-stack', 'li, .bullet')
 *
 *
 * As everything is running through querySelectorAll
 * you can use any valid selector
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * @param a {string|Element} - query or Element
 * @param b {string} - query starting at Element a
 */

function DOM(a, b) {

  var type;


  /*
   * Make sure a is a String, Node, NodeList or Array of Nodes
   */

  type = getType(a);

  if (type.isIncorrect) {
    throw new Error('First argument to DOM() (' + obj + ') must be a String, Node, NodeList, or an Array containing just these types');
    return;
  }


  /*
   * check a contains at least one non whitespace char
   * otherwise querySelectorAll will throw
   */

  if (!/\S/.test(a)) return null;

  var startNode = document;
  var query = a;
  if (a.nodeType === 1 && b === null) {
    return a;
  }
  if (a.nodeType === 1) {
    startNode = a;
    query = b;
  }
  if (typeof a === 'string' && b) {
    startNode = DOM(a);
    query = b;
  }
  const nodeList = startNode.querySelectorAll(query);
  if (nodeList.length === 0) return null;
  if (nodeList.length === 1) return nodeList[0];
  var arr = [];
  for (var i = 0; i < nodeList.length; i++) {
    arr.push(nodeList[i]);
  }
  return arr;
}

function getType(obj) {

  var isString = typeof obj === 'string';
  var isNode = obj instanceof window.Node ;
  var isNodeList = obj instanceof window.NodeList;
  var isArray = Array.isArray(obj);

  if (!isString && !isNode && !isNodeList && !isArray) {
    return { isIncorrect: true };
  }

  return {
    isString: isString,
    isNode: isNode,
    isNodeList: isNodeList,
    isArray: isArray
  };
}

/*
 * The same as DOM(), except when there is only one element it will always
 * return an Array (not NodeList).
 *
 * DOM('#one-of-a-kind') => an array with a length of one containing the element
 *
 * @param a {string|Element} - query or Element
 * @param b {string} - query starting at Element a
 */

DOM.array = function (a, b) {
  var res = DOM(a, b);
  if (res === null) return [];
  if (typeof res === 'array') return res;
  else return [res];
}



/* Add a shortcut 'on' function to all DOM nodes
 *
 * element.on('input change', function (event) {
 *   // do stuff
 * });
 *
 * Allows you to pass multiple events through, as is commonly needed with
 * cross browser development. Also turns off the capture phase of events by
 * default.
 *
 * returns itself for chaining
 */

window.Node.prototype.on = function (events) {
  events.split(' ').forEach((event) => {
    this.addEventListener(event, listener, false);
  });
  return this;
}


module.exports = DOM;
