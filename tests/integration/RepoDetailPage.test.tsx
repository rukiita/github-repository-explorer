import { render, screen } from "@testing-library/react";
import React from "react";
import RepoDetailPage from "@/app/repos/[owner]/[repo]/page";

// --- モック設定 ---

//mock React.use() and useEffect
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    use: (val: any) => val,
    useEffect: jest.fn(),
    useState: (val: any) => [val, jest.fn()],
  };
});

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
jest.mock("react-markdown", () => (props: { children: React.ReactNode }) => {
  return React.createElement(
    "div",
    { "data-testid": "markdown-preview" },
    props.children
  );
});
jest.mock("remark-gfm", () => () => {});

// test

describe("RepoDetailPage Integration", () => {
  test("正常系: 詳細情報とREADMEが表示される", async () => {
    //arrange
    const paramsMock = { owner: "facebook", repo: "react" };
    
    const jsx = await RepoDetailPage({
      params: paramsMock as any,
    });
    //act
    render(jsx);

    //assert
    expect(
      screen.getByRole("heading", { name: /^react$/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/200K/i)).toBeInTheDocument(); // Star数

    expect(screen.getByTestId("markdown-preview")).toBeInTheDocument();
    expect(screen.getByText(/React Readme/)).toBeInTheDocument();
  });
});
