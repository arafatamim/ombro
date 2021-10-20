export default class Color {
  readonly r: number;

  readonly g: number;

  readonly b: number;

  readonly alpha: number;

  constructor(r: number, g: number, b: number, alpha: number = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
  }

  static fromHexString(hex: string): Color {
    return Color.parseHexString(hex);
  }

  static parseHexString(hex: string): Color {
    const base = hex.slice(1);
    const size = base.length;
    const isShort = size <= 4;

    let a = 1.0;

    if (isShort) {
      const r = parseInt(base[0] + base[0], 16);
      const g = parseInt(base[1] + base[1], 16);
      const b = parseInt(base[2] + base[2], 16);
      if (size === 4) {
        a = parseInt(base[3] + base[3], 16) / 255;
      }
      return new Color(r ?? 0, g ?? 0, b ?? 0, a);
    }
    const r = parseInt(base[0] + base[1], 16);
    const g = parseInt(base[2] + base[3], 16);
    const b = parseInt(base[4] + base[5], 16);
    if (size === 8) {
      a = parseInt(base[6] + base[7], 16) / 255;
    }
    return new Color(r ?? 0, g ?? 0, b ?? 0, a);
  }

  getRGBAString(): string {
    return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(
      this.b
    )}, ${this.alpha})`;
  }
}
