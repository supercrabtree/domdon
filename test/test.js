import test from 'ava';
import DOM from '../index.js';

test("DOM('h1') returns the h1 element", t => {
  t.same(window.HTMLHeadingElement, DOM('h1').constructor);
});

test("DOM('li') returns a Array", t => {
  t.same(Array, DOM('li').constructor);
});
