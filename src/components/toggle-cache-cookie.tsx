"use client";

import { apiReact } from "server/trpc/client/trpc-client-provider";
import { RadioGroup } from "./radio-group";
import { useRouter } from "next/navigation";
import { startTransition, useCallback, useState } from "react";

import { toast } from "sonner";
import { TypographyP } from "./typography/typography-p";

const POKEMON_CACHE_KEY = "PokeCache";

interface ToggleCacheCookieProps {
  data?: string;
}

export function ToggleCacheCookie({ data }: ToggleCacheCookieProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const setCookie = apiReact.next.setCookie.useMutation();
  const [cookieValue, cookieOptions] = apiReact.next.getCookie.useSuspenseQuery(
    {
      key: POKEMON_CACHE_KEY,
    },
  );

  const handleSubmit = useCallback(
    (value: string) => {
      setLoading(true);
      startTransition(() => {
        setCookie.mutateAsync({ key: POKEMON_CACHE_KEY, value });
        toast(`Cookie set to ${value}`);
        cookieOptions.refetch();
        router.refresh();
      });
    },
    [cookieOptions, router, setCookie],
  );

  return (
    <div className="flex w-fit flex-col gap-2 rounded-md bg-green-300 p-2">
      <div className="rounded-md bg-white p-2">
        <TypographyP>
          Toogle the cookie to see the difference between cached responses
        </TypographyP>
      </div>
      <RadioGroup
        defaultValue={data}
        disabled={loading}
        onValueChange={handleSubmit}
      />
    </div>
  );
}
