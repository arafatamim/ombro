import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const name = require("./package.json").main.replace(/\.js$/, "");

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild({ minify: true })],
    output: [
      {
        // file: `${name}.js`,
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
      },
      {
        // file: `${name}.mjs`,
        dir: "dist/esm",
        format: "es",
        sourcemap: true,
      },
      {
        dir: "dist/iife",
        format: "iife",
        name: "ombro",
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      // file: `${name}.d.ts`,
      dir: "dist/",
      format: "es",
    },
  }),
];
