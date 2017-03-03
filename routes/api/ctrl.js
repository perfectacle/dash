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
        required: true
      }
    }).then(results => {
      const tmp = [];
      results.forEach(v => {
        v.dataValues.product_pets.forEach(val => {
          for(let key in val.dataValues) {
            v.dataValues['pet_' + key] = val.dataValues[key];
          }
          tmp.push(v.dataValues);
          delete tmp[tmp.length-1].product_pets;
        });
      });
      res.json(tmp);
    }).catch(err => {
      res.json(err);
    });
  });
};