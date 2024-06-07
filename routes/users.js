const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const userController = require('../controllers/userController');
const hotelController = require("../controllers/hotelController");

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.patchUser);
router.delete('/:id',userController.deleteUserTwo)

module.exports = router;
