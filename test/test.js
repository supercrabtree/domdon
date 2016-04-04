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

test("DOM() throws if first argument is not a String or Node", t => {
  t.throws(() => DOM(5));
  t.throws(() => DOM(/\S/));
  t.throws(() => DOM({}));
  t.throws(() => DOM(null));
  t.throws(() => DOM(undefined));

  t.notThrows(() => DOM('h1'));
  t.notThrows(() => DOM(div));
  // TODO
  // t.notThrows(() => DOM(nodeList));
  // t.notThrows(() => DOM([div]));
});

test("DOM() throws if second argument is not a String or undefined", t => {
  t.throws(() => DOM(div, 5));
  t.throws(() => DOM(div, /\S/));
  t.throws(() => DOM(div, {}));
  t.throws(() => DOM(div, null));

  t.notThrows(() => DOM(div, undefined));
  t.notThrows(() => DOM(div, 'h1'));
});



/*
 * DOM argument tests
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

test("DOM('li') returns an Array", t => {
  t.same(Array, DOM('li').constructor);
});

test("DOM('.booger') returns null", t => {
  t.same(null, DOM('.booger'));
});



test("DOM(div) returns div", t => {
  t.same(div, DOM(div));
});

test("DOM(div, 'h1') returns h1", t => {
  t.same(h1, DOM(div, 'h1'));
});




test("DOM('.countries', 'li') returns an Array", t => {
  t.same(Array, DOM('.countries', 'li').constructor);
});



/*
 * DOM.array argument tests
 */

test("DOM.array('') returns Array", t => {
  t.same(Array, DOM.array('').constructor);
});

test("DOM.array('.countries') returns Array", t => {
  t.same(Array, DOM.array('.countries').constructor);
});

test("DOM.array(div) returns Array", t => {
  t.same(Array, DOM.array(div).constructor);
});

test("DOM.array('.boogers') returns Array", t => {
  t.same(Array, DOM.array('').constructor);
});
