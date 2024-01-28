"use client";

import * as React from "react";

import { cn } from "lib/utils";
import { Icons } from "components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    description:
      "Example of random cards fetched and cached through a Netlify Builder Function",
    href: "/",
    title: "Home",
  },
  {
    description:
      "Search for pokemon cards using the Pokemon TCG API and display them in a grid. Search results are cached in a Netlify Data Blob",
    href: "/cards",
    title: "Search Pokemon Cards",
  },
  {
    description: "Random cards cached based on cookie values",
    href: "/cookie",
    title: "Cache cards based on Cookie values",
  },
  {
    description: "Random cards cached based on search params",
    href: "/varied",
    title: "Cache cards based on search params",
  },
];

export function NavigationMenuDemo() {
  const pathname = usePathname();

  return (
    <div className="container relative pt-5">
      <div className="p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Netlify Cache Examples
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      active={component.href === pathname}
                      className={cn(
                        component.href === pathname && "bg-blue-200",
                      )}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Special Thanks</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="https://ui.shadcn.com/"
                        rel="noopener noreferrer"
                      >
                        <Icons.logo className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Made with shadcn/ui.
                          <br></br>
                          <strong>Pleae checkout the project on GitHub.</strong>
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="https://t3.gg/" title="T3.gg" target="_blank">
                    Arguably the best way to start a new NextJ application.
                  </ListItem>
                  <ListItem href="https://pokemontcg.io/" title="Pokemon TCG">
                    An amazing API for Pokemon cards.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    active?: boolean;
  }
>(({ active, children, className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
