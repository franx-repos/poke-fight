import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/pokemon`);
        setPokemons(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { pokemons, isLoading, error };
}

export default useFetchData;
