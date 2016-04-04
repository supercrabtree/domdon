
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
 * @param a {string|Element} - selector or Element
 * @param b {string} - selector starting at Element a
 */

function DOM(a, b) {

  var type, selector, context;


  /*
   * Get the type of the first argument, make sure it is String or Node.
   */

  type = getType(a);

  if (type.isIncorrect) {
    throw new Error('First argument to DOM() (' + a + ') must be a String or Node');
    return;
  }

  /*
   * Get the type of the second argument, make sure it is String or undefined.
   */

  if (b !== undefined && typeof b !== 'string') {
    throw new Error('Second argument to DOM() (' + b + ') must be a String');
    return;
  }


  /*
   * Set the context and selector based on arguments a and b
   */

  if (type.isNode) {
    if (b === undefined) {
      // nothing to select, just return the node
      return a;
    } else {
      context = a;
      selector = b;
    }
  }

  if (type.isString) {
    if (b === undefined) {
      context = document;
      selector = a;
    } else {
      context = DOM(a);
      selector = b;
    }
  }


  /*
   * Check selector contains at least one non whitespace charater
   * otherwise querySelectorAll will throw an error
   */

  if (!/\S/.test(selector)) return null;



  /*
   * Now do the DOM selection
   */

  var nodeList = context.querySelectorAll(selector);

  if (nodeList.length === 0) return null;
  if (nodeList.length === 1) return nodeList[0];


  /*
   * Convert the NodeList to an Array
   */

  var arr = [];

  for (var i = 0; i < nodeList.length; i++) {
    arr.push(nodeList[i]);
  }

  return arr;
}

function getType(obj) {

  var isString = typeof obj === 'string';
  var isNode = obj instanceof window.Node;

  if (!isString && !isNode) {
    return { isIncorrect: true };
  }

  return {
    isString: isString,
    isNode: isNode
  };
}

/*
 * The same as DOM(), except when there is only one element it will always
 * return an Array (not NodeList).
 *
 * DOM('#one-of-a-kind') => an array with a length of one containing the element
 *
 * @param a {string|Element} - selector or Element
 * @param b {string} - selector starting at Element a
 */

DOM.array = function (a, b) {
  var res = DOM(a, b);
  if (res === null) return [];
  if (typeof res === 'array') return res;
  else return [res];
}

module.exports = DOM;
