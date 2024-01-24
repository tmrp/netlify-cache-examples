import { Button } from 'components/ui/button';
import { PageWrapper } from '../components/page-wrapper';
import { api } from '../trpc/server/trpc-api';

export default async function HomePage() {
  return (
    <>
      <Button>button!</Button>
      <h1>home</h1>
    </>
  );
}
