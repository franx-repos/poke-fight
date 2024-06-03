import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Dex', width: 70, disableColumnMenu:true,  description: "The Pokedex Number ",  },
  { field: 'Pokemon', headerName: 'Pokemon', width: 130,disableColumnMenu:true,  description: "Name of the Pokemon",},
  { field: 'wins', headerName: 'Wins', width: 80,disableColumnMenu:true, description: "Number of times the Pokemon won.", type: 'number',},
  {
    field: 'loses',
    headerName: 'Loses',
    type: 'number',
    description: "Number of times the Pokemon lost.",
    disableColumnMenu:true,
    width: 100,
  },
  {
    field: 'Winrate',
    type: "number",
    disableColumnMenu:true,
    headerName: 'Winrate',
    description: 'The Winrate is calculated with Wins/loses.',
    width: 70,
    valueGetter: (value, row) => {
      const percentage = ((row.wins || 0) * 100) / ((row.wins || 0) + (row.loses || 0));
      return Math.round(percentage); 
    }
    
  },
];


const rows = [
  { id: 1, wins: 10, Pokemon: 'Cinccino', loses: 35 },
  { id: 2, wins: 20, Pokemon: 'Probopass', loses: 42 },
  { id: 3, wins: 5, Pokemon: 'Deoxys', loses: 45 },
  { id: 4, wins: 0, Pokemon: 'Shedinja', loses: 16 },
  { id: 5, wins: 105, Pokemon: 'Kyogre', loses: 0 },
  { id: 6, wins: 69, Pokemon: "Vibrava", loses: 150 },
  { id: 7, wins: 16, Pokemon: 'Giratina', loses: 44 },
  { id: 8, wins: 6, Pokemon: 'Slakoth', loses: 36 },
  { id: 9, wins: 2, Pokemon: 'Weavil', loses: 65 },
];

export default function Leaderboard() {
  return (
    <div style={{height: "auto", width: '100%', backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
    <DataGrid  disableRowSelectionOnClick
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
    />
  </div>
  );
}