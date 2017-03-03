'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:1234@localhost/test');
const associations = require('./associations');
const db = {};

fs.readdirSync(__dirname).filter(file =>
  (file.indexOf('.') !== 0) && (file !== 'index.js' && file !== 'associations.js')
).forEach(file => {
  const model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

associations.init(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;