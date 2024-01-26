"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "components/ui/navigation-menu";
import { cn } from "lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/cards", label: "Cards" },
  { href: "/cookie", label: "Cookie" },
  { href: "/varied", label: "Varied" },
];

export const MainNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="container relative pt-5">
      <div className="rounded-md bg-slate-200 p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <ul className="flex flex-row gap-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={item.href === pathname}
                        className={cn(navigationMenuTriggerStyle())}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
