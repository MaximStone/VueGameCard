# Vue 3D CSS Game Card SFC

The fastest way to start building the card game of your dream!

[See demo](https://maximstone.github.io/VueGameCard/)

Component works for with vue3. Hasn't been tested with Vue2.

## Getting started

To start working with card component you would need to install the package

```sh
$ npm install -D vue-3dcss-card
```

In your component / application insert the import and link MCard in your SFC locally

```vue
import MCard from "vue-3dcss-card";
...
components: { MCard },
...
```

Or register component globally (e.g. in App.vue) 
```js
import MCard from "vue-3dcss-card";
app.component('MCard', MCard)
```
