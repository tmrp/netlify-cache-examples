import { schedule, type Handler } from "@netlify/functions";
import { netlifyBlobs } from "lib/clients/netlify-blobs";

const BLOB_KEY = "pokemonCardsData";

const scheduledFunction: Handler = async () => {
  const blobStore = netlifyBlobs(BLOB_KEY);

  const { blobs } = await blobStore.list();

  for (const blob of blobs) {
    console.log("deleting blob", blob.key);
    await blobStore.delete(blob.key);
  }

  return {
    body: JSON.stringify({ message: "Blobs deleted successfully" }),
    statusCode: 200,
  };
};

export const handler = schedule("@daily", scheduledFunction);
