import { getStore } from "@netlify/blobs";
import { schedule, type Handler } from "@netlify/functions";

const BLOB_KEY = "pokemonCardsData";

const scheduledFunction: Handler = async () => {
  const blobStore = getStore(BLOB_KEY);

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
