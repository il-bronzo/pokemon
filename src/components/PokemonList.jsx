import { useEffect, useState} from "react";
import PokemonCard from "./PokemonCard";

const API_URL = "https://pokeapi.co/api/v2";
const LIMIT = 20; //items per page for /pokemon.

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); //a page delivers 20 items

    const loadPokemons = () => {
        setIsLoading(true);
        fetch(`${API_URL}/pokemon?limit=${LIMIT}&offset=${page}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
              }
            return res.json();
        })
        .then ((data) => {
            setPokemons((prev) => [...prev, ...data.results]);
            setError(null)
        }) 
        .catch((err) => {
            console.log("Error while catching the pokemons:", err);
            setError(err);
         })
        .finally(() => {
            setIsLoading(false);
         });
    }

    useEffect(() => {
        loadPokemons();
    }, [page]);

    useEffect(()=> {
        if (pokemons.length === 0) return;
        const observer= new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            console.log("Intersection observed:", firstEntry);
            if (firstEntry.isIntersecting && !isLoading) {
                console.log("Last card is intersecting!"); 
                setPage((prev) => prev+ LIMIT);
            }
        }, {threshold:1.0});
       const lastCard = document.querySelector(".card:last-child");
       console.log("Last card element:", lastCard); 
       if(lastCard) {
        observer.observe(lastCard);
       }
       return () => {
        if(lastCard) {
            console.log("unobserving last card"); 
            observer.unobserve(lastCard);
        }
       };
    }, [isLoading, pokemons])

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>

    return (
    
        <div>
            {pokemons.map((pokemon, index) => { 
                const pokemonId = pokemon.url.split("/")[6];
                const isLastCard = index === pokemons.length - 1;
                console.log(`Pokemon ${pokemon.name} is last card: ${isLastCard}`); // Debug
                return (<PokemonCard name={pokemon.name} key={pokemonId} className={index === pokemons.length-1 ? "card":""}/>)
        
            })}
            {isLoading && <div>Loading more...</div>}
            
        </div>
    
    )
}

export default PokemonList;