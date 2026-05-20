const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
const BaseRepository = require('../repositories/BaseRepository');
const BaseService = require('../services/BaseService');
const BaseController = require('../controllers/BaseController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const showRepo = new BaseRepository(Show);
const showService = new BaseService(showRepo);
const showCrud = new BaseController(showService, 'Show');

// Note: Advanced filtering like populate can eventually be handled in BaseController or via an extension if needed.
// For now, the Admin needs raw basic CRUD for managing records directly.
router.get('/', showCrud.getAll);
router.get('/:id', showCrud.getOne);

router.post('/', auth, admin, showCrud.createOne);
router.put('/:id', auth, admin, showCrud.updateOne);
router.delete('/:id', auth, admin, showCrud.deleteOne);

module.exports = router;
