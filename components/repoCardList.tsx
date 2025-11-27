import React from "react";

import Link from "next/link";
import RepoCard from "./repoCard";

export default function RepoCardList() {
  const repos = {
    0: { name: "repo", discription: "あいうえお" },
    1: { name: "repo", discription: "あいうえお" },
  };

  const fetchRepos = ({ pageParam = 1, queryKey }: any) => {
    const [_, q, sort, lang] = queryKey; //destructuring of queryKey
    if (!q) return { items: [], total_count: 0 };
    const params = new URLSearchParams({
      q,
      sort: sort || "",
      lang: lang || "",
      page: pageParam.toString(),
    });
    const res = await fetch(`api/github?${params}`);
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  };

  return (
    <>
      {repos.map((repo) => {
        <Link href="/repo/${repo.owner}/${repo.repo}">
          <RepoCard repo={repo} />
        </Link>;
      })}
    </>
  );
}
