"use client";

import { useCallback, useState } from "react";
import { RadioGroup } from "./radio-group";
import { TypographyP } from "./typography/typography-p";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

export function ToggleVariedValue() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getDefaultSearchParams = searchParams.get("value");

  const handleParamsChange = useCallback(
    (value: string) => {
      toast(`Setting search param to ${value}`);
      setLoading(true);
      router.push(`?value=${value}`);
    },
    [router],
  );

  return (
    <div className="flex w-fit flex-col gap-2 rounded-md bg-blue-300 p-2">
      <div className="rounded-md bg-white p-2">
        <TypographyP>
          Toogle the varied search params to see the difference between cached
          responses
        </TypographyP>
      </div>
      <RadioGroup
        onValueChange={handleParamsChange}
        defaultValue={getDefaultSearchParams}
        disabled={loading}
      />
    </div>
  );
}
