import "@testing-library/jest-dom";
import "whatwg-fetch";
import React from "react";

import { server } from "./tests/integration/mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

jest.mock("react-markdown", () => (props: { children: React.ReactNode }) => {
  return React.createElement(
    "div",
    { "data-testid": "markdown-preview" },
    props.children
  );
});

jest.mock("remark-gfm", () => () => {});

const IntersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
};

// window オブジェクトと global オブジェクトの両方に定義します
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
