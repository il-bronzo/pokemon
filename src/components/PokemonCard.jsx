import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

function PokemonCard({name}) {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(`${API_URL}/pokemon/${name}`)
        .then((res) => {
            setPokemon(res.data);
            setError(null);
        })
        .catch((err) => {
            console.log(`Error while trying to get ${name}:`, err);
            setError(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [name]);

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return(
        <div>
        <img src={pokemon.sprites.front_default} alt={`Front picture of ${pokemon.name}`}/>
        <h2>{pokemon.name}</h2>
        <p>Types: {pokemon.types.map((typeObj) => typeObj.type.name).join(", ")}</p>
        </div>
    )
}

export default PokemonCard;