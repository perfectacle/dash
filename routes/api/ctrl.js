'use strict';
const fs  = require('fs');
const jwt = require('jsonwebtoken');

exports.pet = (req, res) => {
  const {'x-access-token': token} = req.headers;
  jwt.verify(token, req.app.get('jwt-secret'), (err) => {
    if(err) {
      return res.status(401).json({});
    }
    fs.readFile( __dirname + '/../../data/pet.json', 'utf8', (err, data) => {
      res.end(data);
    });
  });
};