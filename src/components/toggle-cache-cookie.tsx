"use client";

import { apiReact } from "trpc/client/trpc-client-provider";
import { RadioGroup } from "./radio-group";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const POKEMON_CACHE_KEY = "PokeCache";

export function ToggleCacheCookie() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getSuspenseCookie = apiReact.next.getCookie.useSuspenseQuery({
    key: POKEMON_CACHE_KEY,
  });

  const setCookie = apiReact.next.setCookie.useMutation();

  const handleCookieChange = useCallback(
    (value: string) => {
      setCookie
        .mutateAsync({ key: POKEMON_CACHE_KEY, value: value })
        .then(() => {
          setLoading(true);
        });

      router.refresh();
    },
    [router, setCookie, setLoading],
  );

  const defaultCookie = getSuspenseCookie[0];

  return !loading ? (
    <RadioGroup
      onValueChange={handleCookieChange}
      defaultValue={defaultCookie}
    />
  ) : (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      Loading...
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
