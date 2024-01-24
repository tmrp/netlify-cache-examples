import { builder, type Handler } from "@netlify/functions";

const myHandler: Handler = async (event, context) => {
  console.log("handler_event", event, "handler_context", context);

  const getTypes = await fetch("https://api.pokemontcg.io/v2/types");

  const typesResponse = await getTypes.json();

  const randomType =
    typesResponse.data[Math.floor(Math.random() * typesResponse.data.length)];

  const getCardsByType = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=types:${randomType}&page=1&pageSize=10`,
  );

  const { data } = await getCardsByType.json();

  const timeStamp = new Date().toUTCString();

  return {
    body: JSON.stringify({ data, timeStamp, type: randomType }),
    headers: {
      "Cache-Control": "max-age=3600, public",
      "Content-Type": "application/json",
      "Netlify-Vary": "query",
    },
    statusCode: 200,
    ttl: 3600,
  };
};

const handler = builder(myHandler);

export { handler };
