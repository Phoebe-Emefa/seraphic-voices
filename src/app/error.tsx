"use client";

import SiteErrorView from "@/components/shared/SiteErrorView";
import { useQueryClient } from "@tanstack/react-query";

export default function Error({ reset }: { reset: () => void }) {
  const queryClient = useQueryClient();

  const onRetry = () => {
    void queryClient.resetQueries();
    reset();
  };

  return <SiteErrorView onRetry={onRetry} />;
}
