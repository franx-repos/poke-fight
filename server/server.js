import express from "express";
import pokemons from "./data.js";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";
import pokemonRoutes from "./routes/pokemon.js"; // Import der Routen

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routen für feste Pokémon-Daten
app.get("/pokemons", (req, res) => res.json(pokemons));

app.get("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send({ error: "Pokémon not found" });
  }
});

// Routen für dynamische Daten (XP, Wins, Losses)
app.use("/api/pokemon", pokemonRoutes);

app.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
