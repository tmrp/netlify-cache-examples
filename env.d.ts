// pokemonsdk typscript definitions
declare module 'pokemontcgsdk' {
  export interface PokemonApi {
    configure: (config: { apiKey: string }) => PokemonApi;
    card: (id: string) => Promise<any>;
    cards: (query: any) => Promise<any>;
    set: (id: string) => Promise<any>;
    sets: (query: any) => Promise<any>;
    type: (id: string) => Promise<any>;
    types: (query: any) => Promise<any>;
    subtype: (id: string) => Promise<any>;
    subtypes: (query: any) => Promise<any>;
    supertype: (id: string) => Promise<any>;
    supertypes: (query: any) => Promise<any>;
  }

  const pokemon: PokemonApi;
  export default pokemon;
}
