import { NextResponse } from "next/server";

interface ReadmeParams {
  params: {
    owner: string;
    repo: string;
  };
}

export async function GET(request: Request, { params }: ReadmeParams) {
  const { owner, repo } = params;

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner or repo" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Authentication: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github.raw+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (res.status === 404) {
      return new NextResponse(null, { status: 404 });
    }

    if (!res.ok) {
      throw new Error(`GitHub API Error: ${res.status}`);
    }

    const markdown = await res.text();
  } catch (error) {}
}
