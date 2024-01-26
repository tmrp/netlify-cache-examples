"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const transformToSearchQuery = (pokemonCard: string) => {
  const searchQuery = pokemonCard.replace(/\s/g, "+");
  return searchQuery;
};

const formSchema = z.object({
  pokemonCard: z.string().min(2, {
    message: "Pokémon card must be at least 2 characters.",
  }),
});

export const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      pokemonCard: "",
    },
    resolver: zodResolver(formSchema),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    const query = transformToSearchQuery(values?.pokemonCard ?? "");
    const params = query.toString();

    if (!query) {
      return router.push("/");
    }

    router.push(`cards?search=${params.toString()}`);
    router.refresh();
  }

  return (
    <div className="rounded-md bg-slate-200 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pokemonCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Pokémon cards</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Search for a Pokémon card"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
