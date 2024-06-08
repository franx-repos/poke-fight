import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  {
    field: "id",
    headerName: "Dex",
    width: 70,
    disableColumnMenu: true,
    description: "The Pokedex Number",
  },
  {
    field: "name",
    headerName: "Pokemon",
    width: 130,
    disableColumnMenu: true,
    description: "Name of the Pokemon",
  },
  {
    field: "wins",
    headerName: "Wins",
    width: 80,
    disableColumnMenu: true,
    description: "Number of times the Pokemon won.",
    type: "number",
  },
  {
    field: "losses",
    headerName: "Losses",
    type: "number",
    description: "Number of times the Pokemon lost.",
    disableColumnMenu: true,
    width: 100,
  },
  {
    field: "winrate",
    type: "number",
    disableColumnMenu: true,
    headerName: "Winrate",
    description: "The Winrate is calculated with Wins/Losses.",
    width: 70,
    valueGetter: (params) => {
      const wins = params.row.wins || 0;
      const losses = params.row.losses || 0;
      const total = wins + losses;
      return total > 0 ? Math.round((wins / total) * 100) : 0;
    },
  },
];

const updatePokemonStats = async (id, data) => {
  try {
    console.log(`Updating Pokemon with ID: ${id}`);
    console.log('Data:', data);
    const response = await axios.post(`/api/pokemon/${id}`, data);
    console.log('Response data:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Config:', error.config);
  }
};

const Leaderboard = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get("/api/pokemon");
        if (Array.isArray(response.data)) {
          const data = response.data.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name.english,
            wins: pokemon.wins || 0,
            losses: pokemon.losses || 0,
          }));
          setRows(data);
        } else {
          console.error("Die Antwortdaten sind nicht im erwarteten Format:", response.data);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleFight = (id) => {
    // Beispielhafte Werte, die aktualisiert werden sollen
    const data = {
      xp: 50,
      wins: 10,
      losses: 2,
    };
    updatePokemonStats(id, data);
  };

  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <DataGrid
        disableRowSelectionOnClick
        sortingOrder={["desc", "asc"]}
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          headerClassName: "tablehead",
          cellClassName: "tablecell",
        }))}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: "wins", sort: "desc" }],
          },
        }}
      />
      <button onClick={() => handleFight(1)}>Update Pokemon Stats</button>
    </div>
  );
};

export default Leaderboard;
