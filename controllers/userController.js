const User = require('../models/User');
const Hotel = require("../models/Hotel");
const bcrypt = require("bcryptjs")

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe
        const newUser = new User({ username, email, password: hashedPassword }); // Utilisation du mot de passe haché
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.patchUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Hôtel non trouvé' });
        }

        for (const key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                user[key] = req.body[key];
            }
        }

        const updatedHotel = await user.save();
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUserTwo = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!User) {
            return res.status(404).json({ message: "USer not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



