export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  delta(point: Point): Point {
    return new Point(point.x - this.x, point.y - this.y);
  }
}
