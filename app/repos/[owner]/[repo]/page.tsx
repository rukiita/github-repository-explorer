import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RepoHero from "@/components/repoHero";
import RepoActions from "@/components/repoActions";
import ReadmeViewer from "@/components/readmeViewer";

export default function page() {
  return (
    <>
      <div>
        <section>
          <RepoHero />
          <RepoActions />
        </section>
        <section>
          <ReadmeViewer />
        </section>
      </div>
    </>
  );
}
