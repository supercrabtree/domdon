import test from 'ava';
import DOM from '../index.js';

console.log(Date.now());

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
