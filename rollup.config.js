import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.esm.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNext",
          target: "ES2020",
          moduleResolution: "NodeNext",
          declarationDir: "dist",
          sourceMap: true,
        },
      },
    }),
  ],
  external: ["react", "react-native"], // garde externals si tu veux éviter de packager ces libs
};
