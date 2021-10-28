import type { Point } from "./point";

export class Light {
  #intensity: number;

  #position: Point;

  public get position(): Point {
    return this.#position;
  }

  public set position(position: Point) {
    this.#position = position;
  }

  public get intensity(): number {
    return this.#intensity;
  }

  constructor(position: Point = [0, 0]) {
    this.#intensity = 1.0;
    this.#position = position;
  }
}
