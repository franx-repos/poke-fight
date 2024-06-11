import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  {
    field: 'name',
    headerName: 'Pokemon',
    width: 130,
    disableColumnMenu: true,
    description: 'Name of the Pokemon',
  },
  {
    field: 'wins',
    headerName: 'Wins',
    width: 80,
    disableColumnMenu: true,
    description: 'Number of times the Pokemon won.',
    type: 'number',
  },
  {
    field: 'losses',
    headerName: 'Losses',
    type: 'number',
    description: 'Number of times the Pokemon lost.',
    disableColumnMenu: true,
    width: 100,
  },
  {
    field: 'winrate',
    type: 'number',
    disableColumnMenu: true,
    headerName: 'Winrate',
    description: 'The Winrate is calculated with Wins/(Wins + Losses).',
    width: 100,
  },
];

const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/pokemon');
        // console.log('pokemons in leaderboard:', response.data);
        if (Array.isArray(response.data)) {
          const data = response.data.map((pokemon) => {
            const wins = pokemon.wins ?? 0;
            const losses = pokemon.losses ?? 0;
            const total = wins + losses;
            const winrate = total > 0 ? Math.round((wins / total) * 100) : 0;
            return {
              id: pokemon._id,
              name: pokemon.name,
              wins: wins,
              losses: losses,
              winrate: winrate,
            };
          });
          // console.log('Mapped data:', data);
          setRows(data);
        } else {
          console.error(
            'The response data is not in the expected format:',
            response.data
          );
        }
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading leaderboard data: {error.message}</div>;
  }

  return (
    <div
      style={{
        height: 'auto',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        sortingOrder={['desc', 'asc']}
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          headerClassName: 'tablehead',
          cellClassName: 'tablecell',
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'wins', sort: 'desc' }],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Leaderboard;
