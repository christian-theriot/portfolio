/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "dist",
    "coverage",
    "node_modules",
    "src/app",
    "src/server/test.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/server/test.ts"],
  coverageDirectory: "coverage/portfolio/server",
};
