# Ombro.js

[![npm](https://img.shields.io/npm/v/ombro?color=%23CC3534&logo=npm)](https://www.npmjs.com/package/ombro)
![npm](https://img.shields.io/npm/dm/ombro)

Create beautiful, dynamic shadows using JavaScript.

> _"Ombro" is a noun meaning "shadow" in Esperanto._

[![https://nodei.co/npm/ombro.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/ombro.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ombro)

## Installation

NPM:
```sh
npm install ombro
```

Using it in a script tag (IIFE), where the `ombro` namespace is available globally:
```html
<script type="text/javascript" src="https://unpkg.com/ombro/dist/iife/index.js"></script>
```

Importing as an ES module:
```html
<script type="module">
import { Ombro } from "https://unpkg.com/ombro/dist/esm/index.js"
...
</script>
```

## Usage

```js
import { Ombro, Color } from "ombro"

// Create an Ombro instance and attach it to the DOM element you'd like to shine
const element = document.getElementById("element")
const ombro = new Ombro(element, {
    // Optionally set configuration options
    shadowColor: new Color(0, 0, 0)
})

// Set the light position to mouse pointer coordinates
window.addEventListener("mousemove", function(event) {
    ombro.setLightPosition(event.x, event.y)	// set coordinates of light position
    ombro.draw()	// redraw shadows on change
}, false)
```
**Preview:**
<video>
<source src="https://user-images.githubusercontent.com/31634638/172718758-cb4dca4a-b268-4338-8686-137c33963212.mp4" type="video/mp4">
Sorry, your browser doesn't support embedded videos.
</video>

## API Reference

The full API documentation is available [here](https://arafatamim.github.io/ombro).

## Contributing

Please open a new issue if you discover a bug or want to discuss a feature. If you have a bug fix ready, you are welcome to open a pull request.

## Credits

Forked from the unmaintained library [shine.js](https://github.com/bigspaceship/shine.js) and ported to TypeScript.

## License

MIT Licensed.

© 2021 Tamim Arafat.
