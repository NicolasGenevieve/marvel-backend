const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur le site de Marvel");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const favorisRoutes = require("./routes/favoris");
app.use(favorisRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "👀 Aucun super héro par ici !!" });
});

app.listen(process.env.PORT, () => {
  console.log("Serveur de super héro démarré 🥷🦸‍♂️🦹‍♀️👽");
});
