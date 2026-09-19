import './App.css';
import { useState, useEffect, useMemo } from 'react';
import debounce from "debounce";
import { PokemonDisplay } from './components/PokemonDisplay';

function App() {
  // antes del return va lo que es programación como tal, vaya, las funciones y eso
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState();
  const DEBOUNCE_TIME_MILLISECONDS = 500;

  const handleSearchboxChange = (event) => {
    setSearchText(event.target.value);
  }

  const fetchPokemon = async (searchTerm) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      const responseJson = await response.json();
      setPokemon(createPokemon(responseJson));
    } catch (error) {
      console.log(error);
    }
  }


  const debouncedFetchPokemon = useMemo(() => {
    return debounce((searchTerm) => {
      fetchPokemon(searchTerm);
    }, DEBOUNCE_TIME_MILLISECONDS);
  }, []);

  const createPokemon = (responseJson) => {
    return {
      "name": responseJson.name,
      "types": responseJson.types.map((type) => type.type.name),
      "hp": responseJson.stats.filter((stat) => stat.stat.name === "hp")[0].base_stat,
      "attack": responseJson.stats.filter((stat) => stat.stat.name === "attack")[0].base_stat,
      "defense": responseJson.stats.filter((stat) => stat.stat.name === "defense")[0].base_stat,
      "specialAttack": responseJson.stats.filter((stat) => stat.stat.name === "special-attack")[0].base_stat,
      "specialDefense": responseJson.stats.filter((stat) => stat.stat.name === "special-defense")[0].base_stat,
      "speed": responseJson.stats.filter((stat) => stat.stat.name === "speed")[0].base_stat,
      "spriteUrl": responseJson.sprites.front_default
    }
  }

  useEffect(() => {
    if (searchText) {
      debouncedFetchPokemon(searchText);
    }

  }, [searchText, debouncedFetchPokemon]);
  // en el return usamos JSX, que es como HTML dentro de JS
  return (
    // JSX solo soporta enviar un solo elemento, así que todo debe de estar dentro de un fragment, como mínimo
    <>
      <header>
        <h1>Pokedexito 2026</h1>
      </header>
      <main>
        <div className="input-field">
          <label htmlFor="pokemon">Escribe el nombre del pokemon aquí</label>
          <input type="text" placeholder="eevee" name="pokemon" onChange={handleSearchboxChange}></input>
        </div>
        <PokemonDisplay pokemon={pokemon} />
      </main>
    </>
  );
}

export default App;
