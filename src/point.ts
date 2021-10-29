export type Point = [x: number, y: number];

export function delta([x1, y1]: Point, [x2, y2]: Point): Point {
  return [x2 - x1, y2 - y1];
}
