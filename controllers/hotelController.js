const Hotel = require('../models/Hotel');


exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel == null) {
            return res.status(404).json({ message: 'Hotel non trouvé' });
        }
        res.json(hotel);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/*exports.createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};*/
exports.createHotel = async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        telephone: req.body.telephone,
        pricePerNight: req.body.pricePerNight,
        devise: req.body.devise,
        imageUrl: req.body.imageUrl

    });

    try {
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



exports.updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel == null) {
            return res.status(404).json({ message: 'Hôtel non trouvé' });
        }

        if (req.body.name != null) {
            hotel.name = req.body.name;
        }
        if (req.body.address != null) {
            hotel.address = req.body.address;
        }
        if (req.body.email != null) {
            hotel.email = req.body.email;
        }
        if (req.body.telephone != null) {
            hotel.telephone = req.body.telephone;
        }
        if (req.body.pricePerNight != null) {
            hotel.pricePerNight = req.body.pricePerNight;
        }
        if (req.body.imageUrl != null) {
            hotel.imageUrl = req.body.imageUrl;
        }

        const updatedHotel = await hotel.save();
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteHotelTwo = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!Hotel) {
            return res.status(404).json({ message: 'Hôtel non trouvé' });
        }
        res.json({ message: 'Hôtel supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.patchHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel == null) {
            return res.status(404).json({ message: 'Hôtel non trouvé' });
        }

        // Mettre à jour les attributs fournis dans le corps de la requête
        for (const key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                hotel[key] = req.body[key];
            }
        }

        const updatedHotel = await hotel.save();
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
