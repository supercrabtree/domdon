import test from 'ava';
import DOM from '../index.js';

// document, window and sample html from ./helpers/setup-browser-env.js

console.log('DOM', Date.now());

const div = document.createElement('div');
const h1 = document.createElement('h1');
div.appendChild(h1);

const nodeList = h1.childNodes;



/*
 * Type test
 */

test("DOM() throws if first argument is not a String, Node, NodeList or Array of Nodes", t => {
  t.throws(() => DOM(5));
  t.throws(() => DOM(/\S/));
  t.throws(() => DOM({}));

  t.notThrows(() => DOM('h1'));
  t.notThrows(() => DOM(div));
  // TODO
  // t.notThrows(() => DOM(nodeList));
  // t.notThrows(() => DOM([div]));
});



/*
 * String Tests
 */

test("DOM('') returns null", t => {
  t.same(null, DOM(''));
});

test("DOM() call with just whitespace returns null", t => {
  t.same(null, DOM(' '));
  t.same(null, DOM('   '));
  t.same(null, DOM('  \t  \n  '));
});

test("DOM('h1') returns the h1 element", t => {
  t.same(window.HTMLHeadingElement, DOM('h1').constructor);
});

test("DOM('li') returns a Array", t => {
  t.same(Array, DOM('li').constructor);
});

test("DOM('.booger') returns null", t => {
  t.same(null, DOM('.booger'));
});
