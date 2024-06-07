const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.post('/', hotelController.createHotel);
router.patch('/:id', hotelController.patchHotel);
router.delete('/:id', hotelController.deleteHotelTwo);

module.exports = router;
