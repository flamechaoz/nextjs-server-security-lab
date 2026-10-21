import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/debugging/",
    "/solutions/"
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1"
  },
  testMatch: ["**/?(*.)+(test|spec).(ts|tsx)"],
  collectCoverageFrom: [
    "lib/**/*.{ts,tsx}",
    "app/api/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "!**/*.d.ts"
  ]
};
// export default config;
export default createJestConfig(config);
