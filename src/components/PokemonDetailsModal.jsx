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
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={`Front picture of ${pokemon.name}`}/>
                    <img src={pokemon.sprites.back_default} alt={`Back picture of ${pokemon.name}`}/>
                    <p>Types: {pokemon.types.map((typeObj) => typeObj.type.name).join(", ")}</p>
                    <p>Region: {pokemonRegion}</p>
                    <p>Weaknesses: {weaknesses.join(", ")}</p>
                </div>
            </div>
    </>
)
}

export default PokemonDetailsModal;