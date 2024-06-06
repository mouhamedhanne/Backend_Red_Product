const Hotel = require('../models/Hotel');

// Créer un nouvel hôtel
exports.createHotel = async (req, res) => {
  try {
    const { name, address, description, amenities } = req.body;
    const owner = req.user.userId; // Récupéré depuis le middleware d'authentification

    const hotel = new Hotel({
      name,
      address,
      description,
      amenities,
      owner
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Obtenir tous les hôtels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Obtenir un hôtel par ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mettre à jour un hôtel
exports.updateHotel = async (req, res) => {
  try {
    const { name, address, description, amenities } = req.body;

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Vérifier si l'utilisateur est le propriétaire de l'hôtel
    if (hotel.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    hotel.name = name || hotel.name;
    hotel.address = address || hotel.address;
    hotel.description = description || hotel.description;
    hotel.amenities = amenities || hotel.amenities;

    const updatedHotel = await hotel.save();
    res.json(updatedHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Supprimer un hôtel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    // Vérifier si l'utilisateur est le propriétaire de l'hôtel
    if (hotel.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await hotel.remove();
    res.json({ message: 'Hotel removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};