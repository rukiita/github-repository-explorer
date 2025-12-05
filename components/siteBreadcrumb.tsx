"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

export function SiteBreadcrumb() {
  //parse the current path
  const pathname = usePathname();
  //split the path by slash excluding any empty strings
  const segments = pathname.split("/").filter((item) => item !== "");

  //retrieve the previous query from zustand store
  const lastQueryString = useSearchStore((state) => state.lastQueryString);
  //determine Home URL
  const [homeHref, setHomeHref] = useState("/");
  useEffect(() => {
    //if search history exists, We construct a URL that restores the state of the search results page
    if (lastQueryString) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHomeHref(`/?${lastQueryString}`);
    } else {
      //if search history does not exists, We set simpliy top page
      setHomeHref("/");
    }
  }, [lastQueryString]);

  //in the case of top page, we dont display the breadcrumb
  if (segments.length === 0) return null;
  const isRepoDetailPage = segments[0] === "repos" && segments.length === 3;

  return (
    <div className="container py-4 ml-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={homeHref} className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          {isRepoDetailPage ? (
            // repository detail page 
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold capitalize">
                {decodeURIComponent(segments[2])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            // standard hierarchical display 
            segments.map((segment, index) => {
              const isLast = index === segments.length - 1;
              const href = `/${segments.slice(0, index + 1).join("/")}`;

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-semibold capitalize">
                        {decodeURIComponent(segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={homeHref} className="capitalize">
                          {decodeURIComponent(segment)}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
