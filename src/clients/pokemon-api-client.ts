import { Pokemon } from '../types/pokemon';

export class PokemonApiClient {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private maxRetries = 3, private retryDelayMs = 500) {}

  async fetchPokemon(name: string): Promise<Pokemon> {
    const errors: Error[] = [];

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const url = this.baseUrl + encodeURIComponent(name.toLowerCase());
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = (await response.json()) as any;

        return {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
        };
      } catch (err: any) {
        const errorWithCause = new Error(`Attempt ${attempt} failed: ${err.message}`, {
          cause: err,
        });
        errors.push(errorWithCause);

        if (attempt < this.maxRetries) {
          await this.delay(this.retryDelayMs);
        } else {
          throw new AggregateError(errors, `Failed to fetch Pokemon "${name}" after ${this.maxRetries} attempts.`);
        }
      }
    }

    throw new Error('Unexpected error in fetchPokemon');
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
