const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Routes (à ajouter plus tard)
app.get("/", (req, res) => {
  res.send("Hotel App Backend - API is running");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
