import { render, screen } from "@testing-library/react";

// テスト用のダミーコンポーネント
const Hello = () => <h1>Hello, Jest!</h1>;

describe("Jest Environment Check", () => {
  test("renders heading correctly", () => {
    render(<Hello />);

    // 画面に "Hello, Jest!" があるか確認
    const heading = screen.getByRole("heading", { name: /hello, jest!/i });
    expect(heading).toBeInTheDocument();
  });
});
