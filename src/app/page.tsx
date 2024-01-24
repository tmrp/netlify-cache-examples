import { Button } from "components/ui/button";
import { PageWrapper } from "../components/page-wrapper";
import { api } from "../trpc/server/trpc-api";

export default async function HomePage() {
  return (
    <div className="container relative">
      <h1>home</h1>
    </div>
  );
}
