const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const BaseRepository = require('../repositories/BaseRepository');
const BaseService = require('../services/BaseService');
const BaseController = require('../controllers/BaseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const movieRepo = new BaseRepository(Movie);
const movieService = new BaseService(movieRepo);
const movieCrud = new BaseController(movieService, 'Movie');

// Public
router.get('/', movieCrud.getAll);
router.get('/:id', movieCrud.getOne);

// Admin strictly protected routes
router.post('/', auth, admin, movieCrud.createOne);
router.put('/:id', auth, admin, movieCrud.updateOne);
router.delete('/:id', auth, admin, movieCrud.deleteOne);

module.exports = router;
