'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config');
const models = require('../../models');

const secret = config.key;

exports.pet = (req, res) => {
  const {'x-access-token': token} = req.headers;
  jwt.verify(token, secret, (err) => {
    if(err) {
      return res.status(401).json({});
    }
    models.contract_users.findAll({
      include: {
        model: models.product_pets,
        required: true,
        include: {
          model: models.payments,
          required: true
        }
      }
    }).then(results => {
      res.json(results);
    }).catch(err => {
      res.json(err);
    });
  });
};