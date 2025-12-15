import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";

type Bindings = {
  GITHUB_TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

const routes = app
  .get("/api/search", async (c) => {
    // Extract query parameters
    const { GITHUB_TOKEN } = env(c);
    const q = c.req.query("q");
    const sort = c.req.query("sort");
    const lang = c.req.query("lang");
    const page = c.req.query("page") || "1";
    const perPage = c.req.query("per_page") || "30";

    if (!q) {
      return c.json({ item: [], total_count: 0 });
    }

    const githubQuery = `${q} ${lang ? `language:${lang}` : ""}`.trim();
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          githubQuery
        )}&sort=${sort}&page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (!res.ok) {
        return c.json({ error: `Github API Error:${res.status}` }, 500);
      }

      const data = await res.json();
      return c.json(data);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to fetch data" }, 500);
    }
  })

  .get("/api/repos/:owner/:repo", async (c) => {
    const { GITHUB_TOKEN } = env(c);
    const { owner, repo } = c.req.param();

    if (!owner || !repo) {
      return c.json({ error: "Missing owner or repo" }, 400);
    }
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (res.status === 404) {
        return c.json({ error: "Repository not found" }, 404);
      }

      if (!res.ok) {
        return c.json({ error: `GitHub API Error: ${res.status}` }, 500);
      }

      const data = await res.json();
      return c.json(data);
    } catch (error) {
      console.error("API Error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })

  .get("/api/repos/:owner/:repo/readme", async (c) => {
    const { GITHUB_TOKEN } = env(c);
    const { owner, repo } = c.req.param();

    if (!owner || !repo) {
      return c.json({ error: "Missing owner or repo" }, 400);
    }

    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.raw",
          },
        }
      );

      if (res.status === 404) {
        return c.text("", 404);
      }

      if (!res.ok) {
        return c.json({ error: `GitHub API Error: ${res.status}` }, 500);
      }

      const markdown = await res.text();
      return c.text(markdown, 200, {
        "Content-Type": "text/plain; charset=utf-8",
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to fetch README" }, 500);
    }
  });

export default app;
export type AppType = typeof routes;
