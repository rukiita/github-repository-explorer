import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") || "best-match";
  const lang = searchParams.get("lang");
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "30";

  if (!q) {
    return NextResponse.json({ item: [], total_count: 0 });
  }

  const githubQuery = `${q} ${lang ? `language:${lang}` : ""}`.trim();

  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        githubQuery
      )}&sort=${sort}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          accept: "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Github API Error:${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

