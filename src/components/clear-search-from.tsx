"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import path from "path";
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
import { toast } from "components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function ClearSearchForm() {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      items: [],
    },
    resolver: zodResolver(FormSchema),
  });

  const pathnameToArray = pathname.split("/").filter(Boolean);

  if (!pathnameToArray.length) {
    return null;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newSearch = pathnameToArray.filter(
      (path) => path !== data.items.find((item) => item === path),
    );

    router.push(path.join("/", ...newSearch));

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{data.items}</code>
        </pre>
      ),
      duration: 500,
      title: "The following search query will be removed:",
    });
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
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {pathnameToArray.map((item) => (
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