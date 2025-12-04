import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-4 space-y-4">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
