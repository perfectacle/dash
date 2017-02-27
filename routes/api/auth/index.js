'use strict';
const router = require('express').Router();
const ctrl = require('./ctrl');

router.post('/login', ctrl.login);
router.post('/check', ctrl.check);
router.get('/pet', ctrl.pet);

module.exports = router;