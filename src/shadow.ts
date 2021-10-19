import { Color } from "./color";
import { ConfigProps } from "./config";
import { Light } from "./light";
import { Point } from "./point";
import { debounce } from "./timing";

export class Shadow {
  readonly #position: Point;
  readonly #domElement: HTMLElement;
  readonly #shadowProperty: string = "boxShadow";
  #fnHandleViewportUpdate: (() => void) | null = null;
  #fnHandleWindowLoaded: (e: Event) => void;

  public get position(): Point {
    return this.#position;
  }

  public get shadowProperty(): string {
    return this.#shadowProperty;
  }

  constructor(domElement: HTMLElement, enableAutoUpdates = false) {
    this.#position = new Point(0, 0);
    this.#domElement = domElement;

    this.#fnHandleWindowLoaded = this.handleWindowLoaded.bind(this);

    if (enableAutoUpdates) this.enableAutoUpdates();
    this.handleViewportUpdate();

    window.addEventListener("load", this.#fnHandleWindowLoaded, false);
  }

  destroy(): void {
    if (this.#fnHandleWindowLoaded != null) {
      window.removeEventListener("load", this.#fnHandleWindowLoaded, false);
    }
    this.disableAutoUpdates();
    this.#domElement.style[this.#shadowProperty as any] = "";
  }

  draw(light: Light, config: ConfigProps): void {
    const delta = this.#position.delta(light.position);
    const distance = Math.max(
      32,
      Math.sqrt(delta.x * delta.x + delta.y * delta.y)
    );

    const shadows = [];

    for (let i = 0; i < config.steps; i++) {
      const ratio = i / config.steps;

      const ratioOpacity = Math.pow(ratio, config.opacityPow);
      const ratioOffset = Math.pow(ratio, config.offsetPow);
      const ratioBlur = Math.pow(ratio, config.blurPow);

      const opacity =
        light.intensity * Math.max(0, config.opacity * (1.0 - ratioOpacity));
      const offsetX = -(config.offset * delta.x * ratioOffset);
      const offsetY = -(config.offset * delta.y * ratioOffset);
      const blurRadius = (distance * config.blur * ratioBlur) / 512;

      const shadow = this.getShadow(
        config.shadowColor,
        opacity,
        offsetX,
        offsetY,
        blurRadius
      );
      shadows.push(shadow);
    }

    this.drawShadows(shadows);
  }

  getShadow = function (
    color: Color,
    opacity: number,
    offsetX: number,
    offsetY: number,
    blurRadius: number
  ): string {
    const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
    return `${colorString} ${offsetX}px ${offsetY}px ${Math.round(
      blurRadius
    )}px`;
  };

  drawShadows(shadows: string[]) {
    this.#domElement.style[this.#shadowProperty as any] = shadows.join(", ");
  }

  enableAutoUpdates(): void {
    this.disableAutoUpdates();

    const fnHandleViewportUpdate = (this.#fnHandleViewportUpdate = debounce(
      this.handleViewportUpdate,
      1000 / 15
    ));

    document.addEventListener("resize", fnHandleViewportUpdate, false);
    window.addEventListener("resize", fnHandleViewportUpdate, false);
    window.addEventListener("scroll", fnHandleViewportUpdate, false);
  }

  disableAutoUpdates(): void {
    const fnHandleViewportUpdate = this.#fnHandleViewportUpdate;

    if (!fnHandleViewportUpdate) {
      return;
    }

    this.#fnHandleViewportUpdate = null;

    document.removeEventListener("resize", fnHandleViewportUpdate, false);
    window.removeEventListener("resize", fnHandleViewportUpdate, false);
    window.removeEventListener("scroll", fnHandleViewportUpdate, false);
  }

  handleViewportUpdate() {
    if (this.#domElement != null) {
      const boundingRect = this.#domElement.getBoundingClientRect();
      this.#position.x = boundingRect.left + boundingRect.width * 0.5;
      this.#position.y = boundingRect.top + boundingRect.height * 0.5;
    } else {
      throw new Error(
        "Unhandled exception: Cannot update shadows as dom element is undefined"
      );
    }
  }

  handleWindowLoaded(): void {
    this.handleViewportUpdate();
  }
}
