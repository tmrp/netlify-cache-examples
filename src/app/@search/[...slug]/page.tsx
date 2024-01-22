'use client';

import { usePathname, useRouter } from 'next/navigation';
import path from 'path';

export default function SearchPage() {
  const pathname = usePathname();
  const router = useRouter();

  const pathnameToArray = pathname.split('/').filter(Boolean);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get('search');
    if (typeof search === 'string') {
      router.push(`/${search}`);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = pathnameToArray.filter(
      (path) => path !== event.currentTarget.name
    );

    router.push(path.join('/', ...newSearch));
  };

  return (
    <section>
      <h1>Search Pokemon Cards</h1>
      {pathnameToArray.length > 0 && (
        <ul className="flex gap-2">
          remove
          {pathnameToArray.map((path, index) => (
            <li key={index}>
              <input
                type="checkbox"
                name={path}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={path}>{path}</label>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleFormSubmit} method="POST" className="flex flex-row">
        <fieldset className="">
          <input
            type="text"
            name="search"
            placeholder="search for Pokemon cards"
          />
          <button type="submit">Search Pokemon Cards</button>
        </fieldset>
      </form>
    </section>
  );
}
