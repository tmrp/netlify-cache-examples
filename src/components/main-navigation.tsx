"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "components/ui/navigation-menu";

import Link from "next/link";

export const MainNavigation = () => {
  return (
    <div className="container relative pt-5">
      <div className="rounded-md bg-slate-200 p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <ul>
                <li>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </li>
              </ul>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
