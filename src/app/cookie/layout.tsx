import { Toaster } from "components/ui/sonner";

export default function CookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
