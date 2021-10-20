import Point from "./point";

export default class Light {
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

  constructor(position: Point = new Point(0, 0)) {
    this.#intensity = 1.0;
    this.#position = position;
  }
}
