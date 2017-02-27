'use strict';
const router = require('express').Router();
const auth = require('./auth');
const ctrl = require('./ctrl');

router.use('/auth', auth);
router.get('/pet', ctrl.pet);

module.exports = router;