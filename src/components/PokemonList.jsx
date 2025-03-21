import { useEffect, useState, useRef} from "react";
import PokemonCard from "./PokemonCard";
import PokemonDetailsModal from "./PokemonDetailsModal";
import { usePokemons } from "../services/usePomekon";

const LIMIT = 20; 

function PokemonList() {
    const [offset, setOffset] = useState(0); 
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

    
    if(error) return <div className="error-message">Failed to load Pokémon</div>;

    return (
        <>
        <div className="pokemon-list">
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