"use client";

import { apiReact } from "server/trpc/client/trpc-client-provider";
import { RadioGroup } from "./radio-group";
import { useRouter } from "next/navigation";
import { startTransition, useCallback, useState } from "react";

import { toast } from "sonner";
import { TypographyP } from "./typography/typography-p";

const POKEMON_CACHE_KEY = "PokeCache";

export function ToggleCacheCookie() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [data] = apiReact.next.getCookie.useSuspenseQuery({
    key: POKEMON_CACHE_KEY,
  });

  const setCookie = apiReact.next.setCookie.useMutation();

  const handleSubmit = useCallback(
    (value: string) => {
      setLoading(true);
      startTransition(() => {
        setCookie.mutateAsync({ key: POKEMON_CACHE_KEY, value });
        toast(`Cookie set to ${value}`);
        router.refresh();
      });
    },
    [router, setCookie],
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
