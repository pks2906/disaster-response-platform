const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');

router.post('/disasters', disasterController.createDisaster);
router.get('/disasters', disasterController.getDisasters);
router.put('/disasters/:id', disasterController.updateDisaster);
router.delete('/disasters/:id', disasterController.deleteDisaster);

module.exports = router;
