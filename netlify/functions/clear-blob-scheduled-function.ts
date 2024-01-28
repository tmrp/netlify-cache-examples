import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const BLOB_KEY = "pokemonCardsData";

export const config: Config = {
  schedule: "@daily",
};

export default async function ClearBlobScheduledFunction(
  req: Request,
  context: Context,
) {
  const { next_run } = await req.json();

  const blobStore = getStore(BLOB_KEY);

  const { blobs } = await blobStore.list();

  for (const blob of blobs) {
    console.log("deleting blob", blob.key);
    await blobStore.delete(blob.key);
  }

  console.log("next run", next_run);
}
