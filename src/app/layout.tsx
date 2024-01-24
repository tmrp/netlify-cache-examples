import type { Metadata } from "next";
import { headers } from "next/headers";
import { Toaster } from "components/ui/toaster";

import "../styles/globals.css";
import { TrpcClientProvider } from "../trpc/client/trpc-client-provider";

import { Inter as FontSans } from "next/font/google";
import { cn } from "lib/utils";
import { MainNavigation } from "components/main-navigation";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  description: "Generated by create next app",
  title: "Create Next App",
};

export default async function RootLayout({
  children,
  search,
}: Readonly<{
  search: React.ReactNode;
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
              <MainNavigation />
              {search}
              {children}
            </div>
          </main>
          <Toaster />
        </TrpcClientProvider>
      </body>
    </html>
  );
}
