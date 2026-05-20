const express = require('express');
const router = express.Router();
const Theater = require('../models/Theater');
const BaseRepository = require('../repositories/BaseRepository');
const BaseService = require('../services/BaseService');
const BaseController = require('../controllers/BaseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const theaterRepo = new BaseRepository(Theater);
const theaterService = new BaseService(theaterRepo);
const theaterCrud = new BaseController(theaterService, 'Theater');

router.get('/', theaterCrud.getAll);
router.get('/:id', theaterCrud.getOne);

router.post('/', auth, admin, theaterCrud.createOne);
router.put('/:id', auth, admin, theaterCrud.updateOne);
router.delete('/:id', auth, admin, theaterCrud.deleteOne);

module.exports = router;
