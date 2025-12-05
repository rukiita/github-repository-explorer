import "@testing-library/jest-dom";
import "whatwg-fetch";
import React from "react";

import { server } from "./tests/integration/mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

jest.mock("react-markdown", () => {
  const MockMarkdown = (props: { children: React.ReactNode }) => {
    return React.createElement(
      "div",
      { "data-testid": "markdown-preview" },
      props.children
    );
  };
  MockMarkdown.displayName = "MockMarkdown";
  return MockMarkdown;
});

jest.mock("remark-gfm", () => () => {});
