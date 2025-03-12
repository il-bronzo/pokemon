const API_URL = "https://pokeapi.co/api/v2";

function fetchPokemons(offset, limit){ 
return fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
              }
            return res.json();
        })
        .catch((err) => {
            console.error("Error while catching the pokemons:", err);
            throw (err);
         })
}


function fetchPokemonDetails(pokemonName) {
    return fetch(`${API_URL}/pokemon/${pokemonName}`)
    .then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
          }
        return res.json();
    })
    .catch((err) => {
        console.error(`Error while trying to get ${name}:`, err);
        throw err;
    })
}


function fetchPokemonSpecies(pokemonName) {
    return fetch(`${API_URL}/pokemon-species/${pokemonName}`)
    .then((res)=> res.json())

        .catch((err)=>{
            console.error(`Error fetching species for ${pokemonName}:`, error);
            throw err;
    })
}


function fetchGenerations() {
    return fetch(`${API_URL}/generation`)
    .then((res)=>res.json())
    .catch((error) => {
        console.error("Error fetching generations:", error);
        throw error;
    });
}


function fetchGenerationDetails(generationUrl){
    return fetch(generationUrl)
    .then((res)=> res.json())
    .catch((error) => {
        console.error("Error fetching generation details:", error);
        throw error;
    });
}

function fetchTypeDetails(typeUrl){
    return fetch(typeUrl)
    .then((res)=> res.json())
    .catch((error) => {
        console.error("Error fetching type details:", error);
        throw error;
    });
}

export {fetchPokemons, 
    fetchPokemonDetails, 
    fetchPokemonSpecies, 
    fetchGenerations, 
    fetchGenerationDetails,
    fetchTypeDetails}