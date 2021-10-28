import { Color } from "./color";
import { ConfigProps } from "./config";
import { Light } from "./light";
import type { Point } from "./point";
import { delta } from "./point";
import { debounce } from "./timing";

function getShadowString(
  color: Color,
  opacity: number,
  offsetX: number,
  offsetY: number,
  blurRadius: number
): string {
  const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  return `${colorString} ${offsetX}px ${offsetY}px ${Math.round(blurRadius)}px`;
}

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
    this.#position = [0, 0];
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
    const [x, y] = delta(light.position, this.#position);
    const distance = Math.max(32, Math.sqrt(x * x + y * y));

    const shadows = [] as string[];

    for (let i = 0; i < config.steps; i += 1) {
      const ratio = i / config.steps;

      const ratioOpacity = ratio ** config.opacityPow;
      const ratioOffset = ratio ** config.offsetPow;
      const ratioBlur = ratio ** config.blurPow;

      const opacity =
        light.intensity * Math.max(0, config.opacity * (1.0 - ratioOpacity));
      const offsetX = -(config.offset * x * ratioOffset);
      const offsetY = -(config.offset * y * ratioOffset);
      const blurRadius = (distance * config.blur * ratioBlur) / 512;

      const shadow = getShadowString(
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
      this.#position[0] = boundingRect.left + boundingRect.width * 0.5;
      this.#position[1] = boundingRect.top + boundingRect.height * 0.5;
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
