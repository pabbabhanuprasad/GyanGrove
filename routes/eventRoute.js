const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');

router.post('/events/create', eventController.createEvent);
router.get('/events/find', eventController.findEvents);

module.exports = router;


