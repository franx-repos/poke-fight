import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Getallpoke from "./GetAllPoke";
import GetWinsLoses from "./GetWinsLoses";

const columns = [
  {
    field: "id",
    headerName: "Dex",
    width: 70,
    disableColumnMenu: true,
    description: "The Pokedex Number ",
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
    field: "loses",
    headerName: "Loses",
    type: "number",
    description: "Number of times the Pokemon lost.",
    disableColumnMenu: true,
    width: 100,
  },
  {
    field: "Winrate",
    type: "number",
    disableColumnMenu: true,
    headerName: "Winrate",
    description: "The Winrate is calculated with Wins/loses.",
    width: 70,
    valueGetter: (value, pokemon) => {
      const percentage =
        ((pokemon.wins || 0) * 100) / ((pokemon.wins || 0) + (pokemon.loses || 0));
      return Math.round(percentage);
    },
  },
];

export default function Leaderboard() {
  const pokemon = Getallpoke();

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
        rows={pokemon}
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
      <GetWinsLoses/>
    </div>
  );
}