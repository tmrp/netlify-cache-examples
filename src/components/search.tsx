export const Search = ({ formAction }) => {
  return (
    <form action={formAction} method="POST" className="flex flex-row">
      <fieldset className="">
        <input
          type="text"
          name="search"
          placeholder="search for Pokemon cards"
        />
        <button type="submit">Search Pokemon Cards</button>
      </fieldset>
    </form>
  );
};
