import { useEffect, useState } from "react";
import "./PokemonDetailsModal.css";

const API_URL = "https://pokeapi.co/api/v2";

function PokemonDetailsModal ({pokemonName, onCloseDetails}) {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);

    const [regions, setRegions] = useState(null);
    const [pokemonRegion, setPokemonRegion] = useState(null);

//Fetch for the generations and regions
useEffect(()=>{
    fetch(`${API_URL}/generation`)
    .then((res)=>res.json())
    .then((data)=> {
        
        const generationPromises=data.results.map((generation)=>  
            fetch(generation.url)
            .then((res)=> res.json())
        
         );
            Promise.all(generationPromises)
            .then((generationData)=>{
                const regionsMap={};
                generationData.forEach((generation)=> {
                    console.log("generationData", generationData)
                    console.log("generation", generation)
                    regionsMap[generation.name] = generation.main_region.name;
                });
                    setRegions(regionsMap);
            })
            .catch((err)=> setError(err));
        })
        .catch((err)=>setError(err));
}, []);

// Extract region for the pokemon
useEffect(()=> {
    if(pokemonName && regions) {
        fetch(`${API_URL}/pokemon-species/${pokemonName}`)
        .then((res)=> res.json())
        .then((data)=>{
            const region = (regions[data.generation.name]);
            setPokemonRegion(region);
        })
        .catch((err)=>setError(err))
    }
}, [pokemonName, regions])







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
                    <p>Region: {pokemonRegion}</p>
                </div>
            </div>
    </>
)
}

export default PokemonDetailsModal;