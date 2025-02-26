import { useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

const API_URL = "https://pokeapi.co/api/v2";

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(`${API_URL}/pokemon`)
        .then ((res) => {
            setPokemons(res.data.results);
            setError(null)
        }) 
        .catch((err) => {
            console.log("Error while catching the pokemons:", err);
            setError(err);
         })
        .finally(() => {
            setIsLoading(false);
         });
    }, []);

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <>
        <div>
            {pokemons.map((pokemon) => (
                <PokemonCard name={pokemon.name} key={pokemon.name}/>
            ))}
        </div>
        </>
    )
}

export default PokemonList;