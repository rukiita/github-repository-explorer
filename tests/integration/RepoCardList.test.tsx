import { screen, waitFor } from "@testing-library/react";
import RepoCardList from "@/components/repo/repoCardList"; // コンポーネントパスは環境に合わせてください
import { renderWithClient } from "./utils/test-utils";
import * as useGithubHooks from "@/hooks/useGithub";

//mock IntersectionObserver(The browser API used for detecting infinite scroll)
beforeAll(() => {
  if (!window.IntersectionObserver) {
    const IntersectionObserverMock = function () {
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    };
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserverMock,
    });
  }
});

describe("RepoCardList Integration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Success case: Data is displayed after loading.", async () => {
    // mock the data to match the return structure of useInfiniteQuery
    jest.spyOn(useGithubHooks, "useRepoSearch").mockReturnValue({
      data: {
        pages: [
          {
            total_count: 1,
            incomplete_results: false,
            items: [
              {
                id: 1,
                name: "react",
                full_name: "facebook/react",
                description: "A declarative UI library",
                stargazers_count: 200000,
                watchers_count: 5000,
                forks_count: 40000,
                open_issues_count: 100,
                language: "JavaScript",
                html_url: "https://github.com/facebook/react",
                owner: {
                  login: "facebook",
                  avatar_url: "https://example.com/avatar.png",
                  html_url: "https://github.com/facebook",
                },
                updated_at: "2023-01-01T00:00:00Z",
              },
            ],
          },
        ],
        pageParams: [1],
      },
      isLoading: false,
      isFetchingNextPage: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    } as any);

    renderWithClient(<RepoCardList query="react" sortBy="stars" language="" />);

    await waitFor(() => {
      expect(screen.getByText(/^react$/i)).toBeInTheDocument();
      expect(screen.getByText(/A declarative UI library/)).toBeInTheDocument();
    });
  });

  test("Failure Case (or Error Scenario): No Data (Empty State)", async () => {
    // mock empty state
    jest.spyOn(useGithubHooks, "useRepoSearch").mockReturnValue({
      data: {
        pages: [
          {
            total_count: 0,
            incomplete_results: false,
            items: [],
          },
        ],
        pageParams: [1],
      },
      isLoading: false,
      isFetchingNextPage: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    } as any);

    renderWithClient(
      <RepoCardList query="no-results" sortBy="stars" language="" />
    );

    await waitFor(() => {
      expect(screen.getByText(/No repositories found/i)).toBeInTheDocument();
    });
  });

  test("Loading State", async () => {
    // mock loading state
    jest.spyOn(useGithubHooks, "useRepoSearch").mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetchingNextPage: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    } as any);

    renderWithClient(
      <RepoCardList query="loading-test" sortBy="stars" language="" />
    );
  });
});
