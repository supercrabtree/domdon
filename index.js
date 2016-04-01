
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
 * let navStack = DOM('#nav-stack') => element with id nav-stack
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
  let startNode = document;
  let query = a;
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
  let arr = [];
  for (let i = 0; i < nodeList.length; i++) {
    arr.push(nodeList[i]);
  }
  return arr;
}
module.exports = DOM;
