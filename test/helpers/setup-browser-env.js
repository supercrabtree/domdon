/*
 * AVA automatically loads this file before tests so document and window globals
 * are available to the tests
 */

var jsdom = require('jsdom').jsdom;

// create a small html tree to test against

var html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hi Mum!</title>
</head>
<body>

  <h1>Hi Mum!</h1>

  <section>

    <h2>Countries</h2>

    <div class="countries">
      <ul>
        <li>Germany</li>
        <li>Belize</li>
        <li>France</li>
        <li>Australia</li>
        <li>India</li>
      </ul>
    </div>
  </section>

</body>
</html>`

// create the document and expose it globally for the tests
global.document = jsdom(html);
global.window = document.defaultView;

