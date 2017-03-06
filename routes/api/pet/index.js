'use strict';
const router = require('express').Router();
const ctrl = require('./ctrl');

router.get('/', ctrl.getAll);

module.exports = router;