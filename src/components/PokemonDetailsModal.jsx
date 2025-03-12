import { useEffect, useState } from "react";
import "./PokemonDetailsModal.css"; 
import {usePokemonDetails, usePokemonWeaknesses} from "../servicies/usePomekon.js"

const API_URL = "https://pokeapi.co/api/v2";

function PokemonDetailsModal ({pokemonName, onCloseDetails}) {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);

    const [regions, setRegions] = useState(null);
    const [pokemonRegion, setPokemonRegion] = useState(null);

    const [weaknesses, setWeaknesses] = useState([]);

//PROCESS TO GET THE REGION
//Fetch for the generations and regions
useEffect(()=>{
    setIsLoading(true);
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
                    setIsLoading(false);
            })
            .catch((err)=> {
                setError(err)
                setIsLoading(false);
    });
        })
        .catch((err)=>{
            setError(err)
            setIsLoading(false);
});
}, []);

// Extract region for the pokemon
useEffect(()=> {
    if(pokemonName && regions) {
        setIsLoading(true); 
        fetch(`${API_URL}/pokemon-species/${pokemonName}`)
        .then((res)=> res.json())
        .then((data)=>{
            const region = (regions[data.generation.name]);
            setPokemonRegion(region);
            setIsLoading(false); 
        })
        .catch((err)=>{
            setError(err)
            setIsLoading(false); 
    })
    }
}, [pokemonName, regions])


//PROCESS TO GET THE WEAKNESSES
//Fetch for the types of pokemon
useEffect(()=> {
    if(pokemon) {
        setIsLoading(true);
        const typePromises = pokemon.types.map((typeObj)=>
        fetch(typeObj.type.url)
        .then((res)=> res.json())
    );

    Promise.all(typePromises)
    .then((typeData) => {
        const weaknesses = [];

        typeData.forEach((type)=>{
            type.damage_relations.double_damage_from.forEach((weakness) =>{
                weaknesses.push(weakness.name);
            });
        });
        const uniqueWeaknesses = weaknesses.filter((weakness, index) => weaknesses.indexOf(weakness) === index);
        setWeaknesses(uniqueWeaknesses);
        setIsLoading(false);
    })
    .catch((err)=> {
        setError(err)
        setIsLoading(false);
     } );
    }
}, [pokemon]);



//POKEMON DETAILS
//Pokemon details
    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/pokemon/${pokemonName}`)
        .then((res)=> res.json())
        .then((data)=> {
            setPokemon(data)
            setIsLoading(false);
        })
        .catch((err)=> {
            setError(err)
            setIsLoading(false);
    })
    }, [pokemonName])

    if (isLoading) {
        return <p>Loading details...</p>; 
    }
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
                    <p>Weaknesses: {weaknesses.join(", ")}</p>
                </div>
            </div>
    </>
)
}

export default PokemonDetailsModal;