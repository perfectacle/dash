'use strict';
const router = require('express').Router();
const auth = require('./auth');
const pet = require('./pet');

router.use('/auth', auth);
router.use('/pet', pet);

module.exports = router;