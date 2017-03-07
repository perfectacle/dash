'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(`${global.ROOT}/config`);
const sequelize = new Sequelize(config.db.database, config.db.id, config.db.pw, {
  host: config.db.host,
  dialect: config.db.dialect
});
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