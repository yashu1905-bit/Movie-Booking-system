const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const BookingRepository = require('../repositories/BookingRepository');
const BaseService = require('../services/BaseService');
const BaseController = require('../controllers/BaseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const bookingRepo = new BookingRepository(Booking);
const bookingService = new BaseService(bookingRepo);
const bookingCrud = new BaseController(bookingService, 'Booking');

router.get('/', auth, bookingCrud.getAll);
router.get('/:id', auth, bookingCrud.getOne);

// For admin
router.post('/', auth, bookingCrud.createOne);
router.put('/:id', auth, bookingCrud.updateOne);
router.delete('/:id', auth, bookingCrud.deleteOne); // Allows admins (or users via soft checks if customized) to cancel bookings 

module.exports = router;
