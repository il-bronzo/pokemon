import {usePokemonDetails} from "../services/usePomekon.js";


function PokemonCard({name, onSelectCard}) {

    const { pokemon, isLoading, error } = usePokemonDetails(name); 


    if(error) return <p>Error loading {name}: {error}</p>
    if(!pokemon) return null;

    return(
        <div>
            <img src={pokemon.sprites.front_default} alt={`Front picture of ${pokemon.name}`}/>
            <h2>{pokemon.name}</h2>
            <p>Types: {pokemon.types.map((typeObj) => typeObj.type.name).join(", ")}</p>

            <button onClick={onSelectCard}>Details</button>
        </div>
    )
}

export default PokemonCard;