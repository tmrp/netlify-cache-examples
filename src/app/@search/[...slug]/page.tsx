'use client';

import { usePathname } from 'next/navigation';

import { Search } from '../../../components/search';

export default function SearchPage() {
  const pathname = usePathname();

  return (
    <section>
      <h1>Search - {pathname}</h1>
      <Search formAction="" />
    </section>
  );
}
