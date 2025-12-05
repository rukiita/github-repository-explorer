import { screen } from "@testing-library/react";
import RepoDetailPage from "@/app/repos/[owner]/[repo]/page";
import { renderWithClient } from "./utils/test-utils";

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
      await screen.findByRole("heading", { name: /^react$/i })
    ).toBeInTheDocument();

    expect(await screen.findByText(/200K/i)).toBeInTheDocument(); // Star数

    expect(await screen.findByTestId("markdown-preview")).toBeInTheDocument();
    expect(await screen.findByText(/React Readme/)).toBeInTheDocument();
  });
});
