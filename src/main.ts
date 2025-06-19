import { PokemonApiClient } from './clients/pokemon-api-client';
import { PokemonService } from './services/pokemon-service';

async function main() {

  // Simulating a resource that needs to be closed at the end
  let resource: { close: () => void } | null = {
    close: () => console.log('\nResource closed'),
  };

  const apiClient = new PokemonApiClient(3, 1000);
  const service = new PokemonService(apiClient);

  const testCases = ['pikachu', 'invalidpokemonname', 'charizard'];

  try {
    for (const name of testCases) {
      console.log(`\nFetching Pokemon: "${name}"...`);
      const result = await service.getPokemon(name);

      result.match(
        (error) => {
          console.error('Failed to fetch Pokemon:', error.message);
          if (error instanceof AggregateError) {
            console.error('Aggregate errors:');
            for (const cause of error.errors) {
              console.error('-', cause.message);
            }
          }
        },
        (pokemon) => {
          console.log('Pokemon data:', pokemon);
        },
      );
    }

  } finally {
    if (resource) {
      resource.close();
      resource = null;
    }
  }
}

main().catch((e) => console.error('Fatal error:', e));
