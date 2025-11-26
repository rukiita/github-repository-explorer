import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RepoCardList() {
  const repos = {
    0: { name: "repo", discription: "あいうえお" },
    1: { name: "repo", discription: "あいうえお" },
  };
  return (
    <>
      {repos.map((repo) => {
        <Link href="/repo/${repo.owner}/${repo.repo}">
          <Card>
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {repo.discription}
              </CardDescription>
              <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>;
      })}
    </>
  );
}
