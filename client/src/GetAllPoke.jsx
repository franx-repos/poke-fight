import axios from "axios";
import { useState, useEffect } from "react";

function Getallpoke() {
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/pokemons")
      .then((response) => {
        const filteredData = response.data.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name.english,
        }));
        setPoke(filteredData);
      })
      .catch((error) => console.error(error));
  }, []);

  return poke;
}

export default Getallpoke;