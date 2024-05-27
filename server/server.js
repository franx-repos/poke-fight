import express from "express";
import pokemons from "./data.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/pokemons", (req, res) => res.json(pokemons));
//   .get((req, res) => res.send("We retrieve a ressource."))
//   .post((req, res) => res.send("We create a ressource."))
//   .put((req, res) => res.send("We update a ressource."))
//   .patch((req, res) => res.send("We update a ressource partially."))
//   .delete((req, res) => res.send("We delete a ressource."));
// app.get("/something", (req, res) => res.status(418).send("Kram"));

app.get("/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send({ error: "Pokémon not found" });
  }
});

app.listen(PORT, () => console.log("Sever is running on PORT: " + PORT));
