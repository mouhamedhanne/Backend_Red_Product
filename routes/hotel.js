const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const multer = require('multer');

const hotelController = require('../controllers/hotelController');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.post('/', hotelController.createHotel);
router.patch('/:id', hotelController.patchHotel);
router.delete('/:id', hotelController.deleteHotelTwo);
router.delete('/',hotelController.deleteHotelTwoAll);


module.exports = router;
