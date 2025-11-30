/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",

  testEnvironment: "jest-fixed-jsdom",

  setupFilesAfterEnv: ["./jest.setup.ts"],

  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },

  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
    "^.+\\.jsx?$": [
      "ts-jest",
      {
        tsconfig: {
          allowJs: true,
        },
        useESM: true,
      },
    ],
  },

  transformIgnorePatterns: ["node_modules/(?!(until-async|msw|@mswjs)/)"],
};
