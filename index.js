const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:'./.env'});

const app = express();
const port = 3007;

const userRoutes = require('./routes/users');
const hotelRoutes = require('./routes/hotel');
const authRoutes = require("./routes/authRoutes")
const { requireAuth } = require('./middleware/authMiddleware');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

//requireAuth

app.use('/api/users',userRoutes);
app.use('/api/hotels',hotelRoutes);

app.use('/api',authRoutes);
app.use('/api', requireAuth, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
});


// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
