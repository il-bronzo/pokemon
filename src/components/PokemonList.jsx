import { useEffect, useState, useRef} from "react";
import PokemonCard from "./PokemonCard";
import PokemonDetailsModal from "./PokemonDetailsModal";

const API_URL = "https://pokeapi.co/api/v2";
const LIMIT = 20; //items per page for /pokemon.

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0); //a page delivers 20 items
    const observerElem = useRef(null)
    const [clickedPokemon, setClickedPokemon] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_URL}/pokemon?offset=${page}&limit=${LIMIT}`)
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
    }, [page]); 

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) { 
                setPage((prev) => prev+LIMIT);
            }
        }, {threshold: 1})
        if(observerElem.current) {  
            observer.observe(observerElem.current);
        }
        return () => observer.disconnect();
    }, [isLoading]);

    
    if(error) return <div>Error: {error}</div>

    return (
        <>
        <div>
            {pokemons.map((pokemon) => { 
                const pokemonId = pokemon.url.split("/")[6];
                return <PokemonCard name={pokemon.name} key={pokemonId} onSelectCard = {()=> setClickedPokemon(pokemon.name)}/>
            }
            )}
        </div>
        <div ref={observerElem} style={{ height: "20px" }}></div>
        {isLoading && <p>Loading...</p>}

        {clickedPokemon && (
            <PokemonDetailsModal pokemonName={clickedPokemon} onCloseDetails={()=>setClickedPokemon(null)}
            />
        )}
        </>
    )
}

export default PokemonList;