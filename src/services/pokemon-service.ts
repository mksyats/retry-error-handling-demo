import { Either } from '../utils/either';
import { Pokemon } from '../types/pokemon';
import { PokemonApiClient } from '../clients/pokemon-api-client';

export class PokemonService {
  constructor(private apiClient: PokemonApiClient) {}

  async getPokemon(name: string): Promise<Either<Error, Pokemon>> {
    try {
      const pokemon = await this.apiClient.fetchPokemon(name);
      return Either.right(pokemon);
    } catch (error) {
      return Either.left(error instanceof Error ? error : new Error('Unknown error'));
    }
  }
}
