import Color from "./color";

export interface ConfigProps {
  /** The quality of the shadow drawn. Higher numbers may
   * lead to lower performance on some devices.
   * @default 8
   */
  steps: number;

  /** The opacity of shadow in range 0-1.
   * @default 0.1
   * */
  opacity: number;
  /** The power applied to the shadow opacity.
   * @default 1.2
   */
  opacityPow: number;

  /** The length of the shadow to be drawn.
   * @default 0.15
   */
  offset: number;
  /** The power applied to the shadow offset.
   * @default 1.8
   */
  offsetPow: number;

  /** The strength of the shadow blur.
   * @default 40
   */
  blur: number;
  /** The factor by which to blur each step in the shadow.
   * @default 1.4
   */
  blurPow: number;

  /** The color of the shadow
   * @default new ombro.Color(0, 0, 0)
   */
  shadowColor: Color;

  enableAutoUpdates: boolean;
}

export type Config = Partial<ConfigProps>;
