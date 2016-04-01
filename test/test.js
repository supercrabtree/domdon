import test from 'ava';
import {jsdom} from 'jsdom';
import DOM from './';

global.document = jsdom(`
  <body>
    <div>
      <h1>Hi Mum!</h1>
    </div>
  </body>
`);

test(t => {
  t.true(true);
});
