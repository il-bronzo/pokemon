import { useEffect, useState, useRef} from "react";
import PokemonCard from "./PokemonCard";
import PokemonDetailsModal from "./PokemonDetailsModal";
import { usePokemons } from "../servicies/usePomekon";

const API_URL = "https://pokeapi.co/api/v2";
const LIMIT = 20; //items per page for /pokemon.

function PokemonList() {
    const [offset, setOffset] = useState(0); //a page delivers 20 items
    const observerElem = useRef(null)
    const [clickedPokemon, setClickedPokemon] = useState(null);

    const {pokemons, isLoading, error} = usePokemons(offset, LIMIT)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) { 
                setOffset((prev) => prev+LIMIT);
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