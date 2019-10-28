const pokedex = document.getElementById("pokedex");
const cache = {};

const getPokemonsFromApi = async () =>{

    url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const resJson = await  res.json();
    const pokemon = resJson.results.map( (data,index) => ({
                    name:data.name,
                    id:index + 1,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    pokemonUrl:data.url
                    })
    );
                    displayPokemons(pokemon);
   
}

const displayPokemons = (pokemons) => {
    console.log(pokemons);
    
    let htmlString = pokemons.map(pokemon =>
        `<li class="card" onclick="selectPokemon(${pokemon.id})">
            <img class="card-img" src="${pokemon.image}" />
            <h2 class="card-title">${pokemon.name}</h2>
            <p>Index:${pokemon.id}</p>
        </li>`
    ).join('');
    pokedex.innerHTML = htmlString;
};

const selectPokemon = async (id) => {
    if(!cache[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const jsonPokemon = await  res.json();
        cache[id] = jsonPokemon;
        displayPopup(jsonPokemon);
    }else{
        displayPopup(cache[id]);
    }

}

const displayPopup = (pokemon) => {
    const type = pokemon.types.map(type => type.type.name).join(", ");
    const htmlString = `
    <div class=popup>
            <button id="closeBtn" onclick="closePopup()">X</button>
            <div class="card" >
            <img class="card-img" src="${pokemon.sprites['front_default']}" />
            <h2 class="card-title">${pokemon.name}</h2>
            <h3>Index:${pokemon.id}</h3>
            <p> Height:${pokemon.height}, Weight:${pokemon.weight}</p>
            <p><small>Type: ${type}</small></p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    document.body.style.overflow = 'hidden';
    
    
}

const closePopup = () =>{
    const popup = document.querySelector('.popup');
    document.body.style.overflow = '';
    popup.parentElement.removeChild(popup);
    
}

getPokemonsFromApi();