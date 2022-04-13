import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

// Extensions handled by babel:
//const EXTENSIONS = [".ts", ".tsx"];

// Exclude dev and peer dependencies:
const EXTERNAL = [...Object.keys(packageJson.devDependencies), ...Object.keys(packageJson.peerDependencies)];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
        globals: {
          react: "React",
        },
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
        globals: {
          react: "React",
        },
      },
    ],
    external: EXTERNAL,
    plugins: [
      resolve(),
      commonjs({
        exclude: "node_modules",
        ignoreGlobal: true,
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/, ...EXTERNAL],
  },
];
