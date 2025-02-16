import { Suspense } from "react";
import Search from "@/components/Search";

export default function Haku() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <Search />
    </Suspense>
  );
}
