import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// ハンドラー設定を使ってサーバーを作成
export const server = setupServer(...handlers);
