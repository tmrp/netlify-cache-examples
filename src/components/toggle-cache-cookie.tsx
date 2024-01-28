"use client";

import { apiReact } from "server/trpc/client/trpc-client-provider";
import { RadioGroup } from "./radio-group";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { toast } from "sonner";
import { TypographyP } from "./typography/typography-p";

const POKEMON_CACHE_KEY = "PokeCache";

export function ToggleCacheCookie() {
  const [loading, setLoading] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState("");

  const router = useRouter();

  const getSuspenseCookie = apiReact.next.getCookie.useSuspenseQuery({
    key: POKEMON_CACHE_KEY,
  });

  const defaultCookie = getSuspenseCookie[0];
  const setCookie = apiReact.next.setCookie.useMutation();

  const handleCookieChange = useCallback(
    async (value: string) => {
      setCookie
        .mutateAsync({ key: POKEMON_CACHE_KEY, value: value })
        .then(() => {
          setLoading(true);
          setSelectedCookie(value);
          toast(`Setting cookie to ${value}`);

          console.log("refreshing", selectedCookie, value);
          router.refresh();
        });
    },
    [setCookie, setLoading, router, selectedCookie],
  );

  return (
    <div className="flex w-fit flex-col gap-2 rounded-md bg-green-300 p-2">
      <div className="rounded-md bg-white p-2">
        <TypographyP>
          Toogle the cookie to see the difference between cached responses
        </TypographyP>
      </div>
      <RadioGroup
        onValueChange={handleCookieChange}
        defaultValue={defaultCookie}
        disabled={loading}
      />
    </div>
  );
}
