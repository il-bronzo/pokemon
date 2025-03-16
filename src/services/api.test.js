import { fetchPokemons, 
    fetchPokemonDetails, 
    fetchPokemonSpecies, 
    fetchGenerations, 
    fetchGenerationDetails, 
    fetchTypeDetails 
} from '../../src/services/api.js';

describe("Pokemon API", function () {
    it("should fetch a list of pokemons", async () => {
        const pokemons = await fetchPokemons();
        console.log("Pokemons ricevuti:", pokemons); // 👀 DEBUG
    
        expect(pokemons).toBeDefined();
        expect(pokemons.length).toBeGreaterThan(0);
    });

});