import express from 'express';
import mongoose from 'mongoose';
import pokemonRoutes from './routes/pokemon.js';
import connectDB from './db.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Datenbankverbindung
connectDB();

// Routen
app.use('/api/pokemon', pokemonRoutes);

// Starten des Servers
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
