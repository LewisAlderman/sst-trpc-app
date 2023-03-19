import type { QueryClientConfig } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { PropsWithChildren, Suspense, useState } from "react";
import { trpc } from "../utils/trpc";

const defaultQueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
};

export const TRPCProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // See reasoning for this stateful client instantiation here:
  // https://trpc.io/docs/react#3-add-trpc-providers
  const [queryClient] = useState(() => new QueryClient(defaultQueryConfig));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_API_URL + "/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback="loading...">{children}</Suspense>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
