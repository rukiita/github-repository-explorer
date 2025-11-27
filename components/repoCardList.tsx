import React from "react";

import Link from "next/link";
import RepoCard from "./repoCard";
import fetchRepo from "@/lib/api/github";

export default function RepoCardList() {
  const repos = {
    0: { name: "repo", discription: "あいうえお" },
    1: { name: "repo", discription: "あいうえお" },
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
