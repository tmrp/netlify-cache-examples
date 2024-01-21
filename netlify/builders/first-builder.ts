import { builder, Handler } from '@netlify/functions';

const myHandler: Handler = async (event, context) => {
  console.log('Builder_event', event, 'Builder_context', context);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};

const handler = builder(myHandler);

export { handler };
