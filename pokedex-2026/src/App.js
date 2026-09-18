import './App.css';
import {useState, useEffect, useMemo} from 'react';
import debounce from "debounce";

function App() {
  // antes del return va lo que es programación como tal, vaya, las funciones y eso
  const [searchText, setSearchText] = useState("");
  const DEBOUNCE_TIME_MILLISECONDS = 500;

  const handleSearchboxChange = (event) => {
    setSearchText(event.target.value);
  }

  const fetchPokemon = async (searchTerm) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      } catch (error) {
        console.log(error);
      }
    }


  const debouncedFetchPokemon = useMemo(() => {
    return debounce((searchTerm) => {
      fetchPokemon(searchTerm);
    }, DEBOUNCE_TIME_MILLISECONDS);
  }, []);


  useEffect(() => {
    if(searchText) {
      debouncedFetchPokemon(searchText);
    }

  } ,[searchText, debouncedFetchPokemon]);
  // en el return usamos JSX, que es como HTML dentro de JS
  return (
    // JSX solo soporta enviar un solo elemento, así que todo debe de estar dentro de un fragment, como mínimo
    <>
      <header>
        Pokedexito 2026        
      </header>
      <label htmlFor="pokemon">Escribe el nombre del pokemon aquí</label>
      <input type="text" placeholder="eevee" name="pokemon" onChange={handleSearchboxChange}></input>
    </>
  );
}

export default App;
