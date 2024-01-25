"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";

import { useRouter, useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function ClearSearchForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const searchQueryParms = searchParams.get("search");

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      items: [],
    },
    resolver: zodResolver(FormSchema),
  });

  if (!searchQueryParms || !searchQueryParms.length) {
    return null;
  }

  const searchParamsToArray = searchQueryParms?.split(" ").filter(Boolean);

  if (!searchParamsToArray?.length) {
    return null;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newSearchQuery = searchParamsToArray?.filter(
      (item) => !data.items.includes(item),
    );

    if (!newSearchQuery.length) {
      return router.push("/");
    }

    return router.push(`/cards?search=${newSearchQuery.join(" ")}`);
  }

  return (
    <div className="max-w-max rounded-md bg-slate-200 p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-2"
        >
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem className="">
                <div className="mb-4">
                  <FormLabel className="text-base">Queries</FormLabel>
                  <FormDescription>
                    Select the items you want to remove from the results.
                  </FormDescription>
                </div>
                {searchParamsToArray.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
