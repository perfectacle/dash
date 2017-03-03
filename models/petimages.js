'use strict';
const models = require('./index');

module.exports = (sequelize, DataTypes) => (
  sequelize.define('petimages', {
    image1: {type: DataTypes.STRING},
    image2: {type: DataTypes.STRING},
    image3: {type: DataTypes.STRING},
    image4: {type: DataTypes.STRING}
  }, {
    classMethods: {},
    tableName: 'petimages',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
);