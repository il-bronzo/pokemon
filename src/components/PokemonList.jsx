import { useEffect, useState} from "react";
import PokemonCard from "./PokemonCard";

const API_URL = "https://pokeapi.co/api/v2";

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/pokemon`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
              }
            return res.json();
        })
        .then ((data) => {
            setPokemons(data.results);
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

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>

    return (
        <>
        <div>
            {pokemons.map((pokemon) => (
                <PokemonCard name={pokemon.name} key={pokemon.name}/>
            )
            )}
            
        </div>
        </>
    )
}

export default PokemonList;