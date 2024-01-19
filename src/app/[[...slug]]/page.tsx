import HomePage from './_pages/home-page';
import PokemonPage from './_pages/pokemon-page';

export default async function Home({ params }: { params: { slug: string[] } }) {
  if (!params.slug) {
    return <HomePage />;
  }

  return <PokemonPage params={params} />;
}
