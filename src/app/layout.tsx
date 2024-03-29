import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "components/ui/toaster";

import "../styles/globals.css";
import { TrpcClientProvider } from "../server/trpc/client/trpc-client-provider";

import { Inter as FontSans } from "next/font/google";
import { cn } from "lib/utils";

import { NavigationMenuDemo } from "components/header-navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  description: "Netlify Cache Examples",
  title: "PokeCache",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TrpcClientProvider headers={headers()}>
          <main className="mx-auto max-w-4xl flex-1">
            <div className="flex flex-col gap-5">
              {/* <MainNavigation /> */}
              <NavigationMenuDemo />

              {children}
            </div>
          </main>
          <Toaster />
        </TrpcClientProvider>
      </body>
    </html>
  );
}
