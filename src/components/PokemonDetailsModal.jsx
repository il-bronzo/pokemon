import { useEffect, useState } from "react";
import "./PokemonDetailsModal.css";

const API_URL = "https://pokeapi.co/api/v2";

function PokemonDetailsModal ({pokemonName, onCloseDetails}) {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`${API_URL}/pokemon/${pokemonName}`)
        .then((res)=> res.json())
        .then((data)=>setPokemon(data))
        .catch((err)=> setError(err))
    }, [pokemonName])

    if (error) return <p>Error loading {pokemonName}: {error.message}</p>;
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

                </div>
            </div>
    </>
)
}

export default PokemonDetailsModal;