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
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const lastQueryString = useSearchStore((state) => state.lastQueryString);
  //solution of hydration error
  const [homeHref, setHomeHref] = useState("");
  useEffect(() => {
    if (lastQueryString) {
      setHomeHref(`/?${lastQueryString}`);
    } else {
      setHomeHref("/");
    }
  },[lastQueryString]);

  if (segments.length === 0) return null;
  const isRepoDetailPage = segments[0] === "repos" && segments.length === 3;

  return (
    <div className="container py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          {isRepoDetailPage ? (
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold capitalize">
                {decodeURIComponent(segments[2])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
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
