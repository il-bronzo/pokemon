import { useEffect, useState } from "react";

const API_URL = "https://pokeapi.co/api/v2";

function PokemonCard({name, onSelectCard}) {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/pokemon/${name}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
              }
            return res.json();
        })
        .then((data) => {
            setPokemon(data);
            setError(null);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(`Error while trying to get ${name}:`, err);
            setError(err);
            setIsLoading(false);
        })
    }, [name]);

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