import { screen } from "@testing-library/react";
import React from "react";
import RepoDetailPage from "@/app/repos/[owner]/[repo]/page";
import { renderWithClient } from "./utils/test-utils";

// mock custom hooks
jest.mock("@/hooks/useGithub", () => ({
  useRepository: jest.fn().mockReturnValue({
    data: {
      id: 1,
      name: "react",
      full_name: "facebook/react",
      description: "A declarative, efficient, and flexible JavaScript library",
      stargazers_count: 200000,
      watchers_count: 6000,
      forks_count: 40000,
      open_issues_count: 500,
      language: "JavaScript",
      html_url: "https://github.com/facebook/react",
      owner: {
        login: "facebook",
        avatar_url: "https://example.com/avatar.png",
        html_url: "https://github.com/facebook",
      },
      license: { name: "MIT" },
      updated_at: "2023-01-01T00:00:00Z",
    },
    isLoading: false,
    error: null,
  }),
  useReadme: jest.fn().mockReturnValue({
    data: "# React Readme\n\nThis is a mock readme.",
    isLoading: false,
    error: null,
  }),
}));

// mock zustand`s store
jest.mock("@/store/recentRepos", () => ({
  useRecentRepos: () => jest.fn(), // addRepo関数として振る舞うモック
}));

// mock markdown
// eslint-disable-next-line react/display-name
jest.mock("react-markdown", () => (props: { children: React.ReactNode }) => {
  return React.createElement(
    "div",
    { "data-testid": "markdown-preview" },
    props.children
  );
});

// test
describe("RepoDetailPage Integration", () => {
  test("正常系: 詳細情報とREADMEが表示される", async () => {
    //arrange
    const paramsMock = Promise.resolve({ owner: "facebook", repo: "react" });

    const jsx = await RepoDetailPage({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params: paramsMock as any,
    });
    //act
    renderWithClient(jsx);

    //assert
    expect(
      screen.getByRole("heading", { name: /^react$/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/200K/i)).toBeInTheDocument(); // Star数

    expect(screen.getByTestId("markdown-preview")).toBeInTheDocument();
    expect(screen.getByText(/React Readme/)).toBeInTheDocument();
  });
});
