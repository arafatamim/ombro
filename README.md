# Ombro

Create beautiful, dynamic shadows using JavaScript.

> _"Ombro" is a noun meaning "shadow" in Esperanto._

## Installation

NPM:
```sh
npm install ombro
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

## API Reference

#### `new Ombro(domElement: HTMLElement, config?: ombro.Config)`

Constructs an Ombro instance with configuration options that you can optionally set before initialization. Below is the list of all configuration options and their descriptions.

| Property          | Type          | Description                                                  | Default value              |
| ----------------- | ------------- | ------------------------------------------------------------ | -------------------------- |
| steps             | `number`      | The quality of the shadow drawn. Higher numbers may lead to lower perfomance on some devices. | `5`                        |
| opacity           | `number`      | The opacity of the shadow in range between 0 and 1.          | `0.15`                     |
| opacityPow        | `number`      | The power applied to the shadow opacity.                     | `1.2`                      |
| offset            | `number`      | The length of the shadow to be drawn.                        | `0.15`                     |
| offsetPow         | `number`      | The power applied to the shadow offset.                      | `1.8`                      |
| blur              | `number`      | The strength of the shadow blur.                             | `40`                       |
| blurPow           | `number`      | The exponent to apply the blur of each step in shadow.       | `1.0`                      |
| shadowColor       | `ombro.Color` | The color of the shadow                                      | `new ombro.Color(0, 0, 0)` |
| enableAutoUpdates | `boolean`     | Whether to redraw shadows when window is scrolled or resized | `false`                    |

#### `Ombro.prototype.setLightPosition(x: number, y: number)`

Sets the coordinates of the light source.

#### `Ombro.prototype.draw()`

Draw all shadows based on current light position. Call this method whenever a parameter has changed.

#### `Ombro.prototype.destroy()`

Removes all event listeners that were set when auto updates were enabled.

### ombro.Color

#### `new ombro.Color(r: number, g: number, b: number, alpha?: number = 1.0)`

Creates a new color object, where `r`, `g`, and `b` each represent a unit of color measured on a scale of 0-255, and `alpha` is specified in range between 0 and 1, where 1 is fully opaque.

#### `ombro.Color.fromHexString(hex: string): Color`

Constructs a `ombro.Color` object from a hex color string.
Here are some examples of valid color strings:

```js
ombro.Color.fromHexString("#f59c22")
ombro.Color.fromHexString("#fff")
ombro.Color.fromHexString("#f22c45ee")
```

## Contributing

Please open a new issue if you discover a bug or want to discuss a feature. If you have a bug fix ready, you are welcome to open a pull request.

## Credits

Forked from the unmaintained library [shine.js](https://github.com/bigspaceship/shine.js) and ported to TypeScript.

## License

MIT Licensed.

© 2021 Tamim Arafat.
