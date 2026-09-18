import './App.css';
import {useState} from 'react';

function App() {
  // antes del return va lo que es programación como tal, vaya, las funciones y eso
  const [searchText, setSearchText] = useState("");

  const handleSearchboxChange = (event) => {
    setSearchText(event.target.value);
  }
  // en el return usamos JSX, que es como HTML dentro de JS
  return (
    // JSX solo soporta enviar un solo elemento, así que todo debe de estar dentro de un fragment, como mínimo
    <>
      <header>
        Pokedexito 2026        
      </header>
      <label for="pokemon">Escribe el nombre del pokemon aquí</label>
      <input type="text" placeholder="eevee" name="pokemon" onChange={handleSearchboxChange}></input>
    </>
  );
}

export default App;
