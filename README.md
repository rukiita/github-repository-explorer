今回は前回のcrypto-dashboardで残った課題+新しい技術という前提で課題に取り組みました。

//Gif画像

・技術スタック
言語:TypeScript
フレームワーク:Next.js
state/Cache:TanStack Query,Zustand,localstorage
hooks:CustomHooks
UI/UX:Shadcn UI,TailWind CSS

・要件
無限スクロール、テーマ切替、ページ遷移を伴うアプリケーション、お気に入り機能、何らかのアルゴリズムを組み込んだ機能、E2Eテスト

・開発の流れ
1日目:アーキテクチャとAPI調査

前回はクライアントから直接APIリクエストをしていました、APIキー自体が特に漏洩しても問題ない且つ1ページで
今回はページ遷移を伴うアプリであるため
RouteHandlerを採用し、