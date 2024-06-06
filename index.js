const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
require("dotenv").config();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Configurer CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);

app.get("/", (req, res) => {
  res.send("Hotel App Backend - API is running");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
