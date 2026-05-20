const express = require('express');
const router = express.Router();
const User = require('../models/User');
const BaseRepository = require('../repositories/BaseRepository');
const BaseService = require('../services/BaseService');
const BaseController = require('../controllers/BaseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const userRepo = new BaseRepository(User);
const userService = new BaseService(userRepo);
const userCrud = new BaseController(userService, 'User');

// User lists strictly admin
router.get('/', auth, admin, userCrud.getAll);
router.get('/:id', auth, admin, userCrud.getOne);

router.post('/', auth, admin, userCrud.createOne);
router.put('/:id', auth, admin, userCrud.updateOne);
router.delete('/:id', auth, admin, userCrud.deleteOne);

module.exports = router;
