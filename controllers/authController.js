const jwt = require('jsonwebtoken');

const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    try {
        if (!user) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
        }

        // Génération du token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = await req.body;
        const hashedPassword = await bcrypt.hash(password, 10);



        const user = User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered', user: user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
