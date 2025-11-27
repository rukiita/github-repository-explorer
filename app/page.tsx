import RepoCardList from "@/components/repoCardList";
import Image from "next/image";

interface HomeProps {
  searchParams: {
    q?: string;
    sort?: string;
    lang?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <RepoCardList />
    </>
  );
}
