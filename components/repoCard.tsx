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

interface RepoCardProps {
  repo: any;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
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
  );
}
