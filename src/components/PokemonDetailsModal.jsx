import "./PokemonDetailsModal.css"; 
import {usePokemonDetails, usePokemonWeaknesses, usePokemonRegion} from "../services/usePomekon.js"


function PokemonDetailsModal ({pokemonName, onCloseDetails}) {


    const { pokemon, isLoading: isPokemonLoading, error: pokemonError } = usePokemonDetails(pokemonName);
    const { region: pokemonRegion, isLoading: isRegionLoading, error: regionError } = usePokemonRegion(pokemonName);
    const { weaknesses, isLoading: isWeaknessesLoading, error: weaknessesError } = usePokemonWeaknesses(pokemon);

    if (isPokemonLoading || isRegionLoading || isWeaknessesLoading) {
        return <p>Loading details...</p>; 
    }

    const errorMessage = pokemonError || regionError || weaknessesError;
    if (errorMessage) return <p>Error loading {pokemonName}: {errorMessage.message}</p>;
    if (!pokemon) return null;

return (
    <>
            <div className="modal-overlay"> 
                <div className="modal-content">
                    <button className="close-btn" onClick={onCloseDetails}>X</button>
                    
                    <img src={pokemon.sprites.front_default} alt={`Front picture of ${pokemon.name}`}/>
                    <img src={pokemon.sprites.back_default} alt={`Back picture of ${pokemon.name}`}/>
                    <div className="pokemon-details">
                    <h2>{pokemon.name}</h2>
                    <p><strong>Types:</strong> {pokemon.types.map((typeObj) => typeObj.type.name).join(", ")}</p>
                    <p><strong>Region:</strong> {pokemonRegion}</p>
                    <p><strong>Weaknesses:</strong> {weaknesses.join(", ")}</p>
                    </div>
                </div>
            </div>
    </>
)
}

export default PokemonDetailsModal;