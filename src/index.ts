import { Color } from "./color";
import { Config, ConfigProps } from "./config";
import { Light } from "./light";
import { Shadow } from "./shadow";

export default class Ombro {
  #light: Light;

  #config: ConfigProps;

  #domElement: HTMLElement;

  #fnDrawHandler?: () => void;

  #shadow?: Shadow;

  public get shadow(): Shadow | undefined {
    return this.#shadow;
  }

  public get light(): Light {
    return this.#light;
  }

  public get config(): ConfigProps {
    return this.#config;
  }

  constructor(domElement: HTMLElement, config: Config = {}) {
    this.#light = new Light();
    this.#config = {
      steps: config.steps ?? 5,
      opacity: config.opacity ?? 0.15,
      opacityPow: config.opacityPow ?? 1.2,
      offset: config.offset ?? 0.15,
      offsetPow: config.offsetPow ?? 1.8,
      blur: config.blur ?? 40,
      blurPow: config.blurPow ?? 1.0,
      shadowColor: config.shadowColor ?? new Color(0, 0, 0),
      enableAutoUpdates: config.enableAutoUpdates ?? false,
    };
    this.#domElement = domElement;

    this.updateContent();
  }

  /** Sets the coordinates of the light source */
  setLightPosition(x: number, y: number): void {
    this.#light.position.x = x;
    this.#light.position.y = y;
  }

  destroy(): void {
    this.disableAutoUpdates();

    this.#shadow?.destroy();

    (this.#fnDrawHandler as unknown) = null;
  }

  /** Draw all shadows based on current light position.
   * Call this method whenever a parameter is changed.
   */
  draw(): void {
    this.#shadow?.draw(this.#light, this.#config);
  }

  private updateContent(): void {
    this.disableAutoUpdates();

    this.#shadow = new Shadow(this.#domElement);

    if (this.#config.enableAutoUpdates === true) {
      this.enableAutoUpdates();
    }
  }

  /** Redraws shadows when window is scrolled or resized */
  enableAutoUpdates(): void {
    this.disableAutoUpdates();
    this.#config.enableAutoUpdates = true;

    // store reference for more efficient minification
    const fnDrawHandler = (this.#fnDrawHandler = this.draw.bind(this));

    window.addEventListener("scroll", fnDrawHandler, false);
    window.addEventListener("resize", fnDrawHandler, false);

    this.#shadow?.enableAutoUpdates();
  }

  /** Disables auto updates of shadows */
  disableAutoUpdates(): void {
    this.#config.enableAutoUpdates = false;

    const fnDrawHandler = this.#fnDrawHandler;

    // compatibility with old Firefox versions
    if (!fnDrawHandler) {
      return;
    }

    (this.#fnDrawHandler as unknown) = null;

    window.removeEventListener("scroll", fnDrawHandler, false);
    window.removeEventListener("resize", fnDrawHandler, false);

    this.#shadow?.disableAutoUpdates();
  }

  /** Sets the target element to create a new shadow instance on */
  setDomElement(domElement: HTMLElement): void {
    this.disableAutoUpdates();
    this.#domElement = domElement;
    this.updateContent();
  }
}
