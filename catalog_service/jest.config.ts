/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset:'ts-jest',
  collectCoverage: true,
  verbose:true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  coverageDirectory: "coverage",

  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation

};

export default config;
