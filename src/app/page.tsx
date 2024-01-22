import { PageWrapper } from '../components/page-wrapper';
import { api } from '../trpc/server/trpc-api';

export default async function HomePage() {
  const cached = api.netlify.getCachedBlobs.query();

  console.log('cached', cached);
  return <h1>home</h1>;
}
