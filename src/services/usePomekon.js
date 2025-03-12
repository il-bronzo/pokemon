import { useState, useEffect } from "react";
import { fetchPokemons, 
    fetchPokemonDetails, 
    fetchPokemonSpecies, 
    fetchGenerations, 
    fetchGenerationDetails,
    fetchTypeDetails} from "./api";


function usePokemons(offset, limit) {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchPokemons(offset, limit)
        .then((data) => {
            setPokemons((prev) => [...prev, ...data.results]);
            setError(null)
        })
        .catch((err) => {
            setError(err);
    })
    .finally(() => {
        setIsLoading(false);
    })
}, [offset, limit]);
return {pokemons, isLoading, error}
}



function usePokemonDetails(pokemonName){
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        if (!pokemonName) return; 
        setIsLoading(true);
        fetchPokemonDetails(pokemonName)
        .then((data) => {
            setPokemon(data);
            setError(null);
    })
    .catch((err) => {
        console.error("Error fetching Pokémon details:", err);
        setError(err);
    })
    .finally(() => {
        setIsLoading(false);
    });
}, [pokemonName]);
return {pokemon, isLoading, error};
}



function usePokemonWeaknesses(pokemon) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weaknesses, setWeaknesses] = useState([]);

    useEffect(()=> {
        if(pokemon) {
            setIsLoading(true);
            const typePromises = pokemon.types.map((typeObj)=>
            fetchTypeDetails(typeObj.type.url)
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
     });
    }
}, [pokemon]);

return {weaknesses, isLoading, error};
}



function usePokemonRegion(pokemonName) {
    const [region, setRegion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [regions, setRegions] = useState({});

    useEffect(()=>{
        if (!pokemonName) return;
        setIsLoading(true);
        fetchGenerations()
        .then((data)=> {
            const generationPromises = data.results.map((generation)=>
            fetchGenerationDetails(generation.url)
        );
        return Promise.all(generationPromises);
        })
        .then((generationData) => {
            const regionsMap = {};
            generationData.forEach((generation)=> {
                regionsMap[generation.name] = generation.main_region.name;
            });
            setRegions(regionsMap);
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err);
            setIsLoading(false)
        });
}, [])

    useEffect(() => {
        if(pokemonName && regions) {
            setIsLoading(true);
            fetchPokemonSpecies(pokemonName)
            .then((data)=> {
                setRegion(regions[data.generation.name]);
                setIsLoading(false);
            })
            .catch((err)=> {
                setError(err);
                setIsLoading(false);
            })
        }
    }, [pokemonName, regions])

    return {region, isLoading, error};

}



export {usePokemons, usePokemonDetails, usePokemonWeaknesses, usePokemonRegion}