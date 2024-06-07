const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    devise: {
        type: String,
        required: false
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;