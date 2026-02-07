import { type Config } from "prettier";

const config: Config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  bracketSpacing: true,
  objectWrap: "preserve",
  bracketSameLine: false,
  arrowParens: "always",
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: false,
};

export default config;
