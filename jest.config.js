/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",

  testEnvironment: "jest-fixed-jsdom",

  setupFilesAfterEnv: ["./jest.setup.ts"],

  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],

  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  transformIgnorePatterns: ["node_modules/(?!(until-async|msw|@mswjs)/)"],

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

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./tests/reports/integration",
        filename: "report.html",
        expand: true,
        pageTitle: "Integration Test Report",
      },
    ],
  ],
};
