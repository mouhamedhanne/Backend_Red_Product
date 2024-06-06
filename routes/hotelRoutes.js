const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

// Créer un nouvel hôtel
router.post("/", protect, authorize("admin"), createHotel);

// Obtenir tous les hôtels
router.get("/", getAllHotels);

// Obtenir un hôtel par ID
router.get("/:id", getHotelById);

// Mettre à jour un hôtel
router.put("/:id", protect, authorize("admin"), updateHotel);

// Supprimer un hôtel
router.delete("/:id", protect, authorize("admin"), deleteHotel);

module.exports = router;
