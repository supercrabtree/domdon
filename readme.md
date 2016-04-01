![](https://raw.githubusercontent.com/supercrabtree/domdon/master/media/domdom-header.jpg)

# Simple DOM Selection

Domdon builds on top of document.querySelectorAll() adding a small ammount of syntax sugar, to make your code a little cleaner and easier to read.

The most basic use is very similar to how querySelector or querySelectorAll work.

```html
<div id="countries">  
  <ul>  
    <li>Germany</li>  
    <li>Belize</li>  
    <li>France</li>  
    <li>Australia</li>  
    <li>India</li>  
  </ul>  
</div>  
```
Against this html running:

```js
DOM('#countries')
```
Would return the countries div.

If there is only one element then `DOM()` will return that Node, if there is more than one element then `DOM()` will return an array of all the elements.

```js
DOM('li')
```
Would return an Array (not a NodeList) containing all of the li elements.

This makes it very easy to write stuff like this:

```js
DOM('li').forEach(li => li.style.color = 'red')
```

I have found this method to work really well as generally I tend to know the structure of the html. If for any reason you are not sure what will come back, then you can always use `DOM.array()` to make sure an array is returned.

```js
DOM.array('#countries').forEach(el => el.innerHTML = '')
```
