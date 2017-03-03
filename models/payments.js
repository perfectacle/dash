'use strict';
const models = require('./index');

module.exports = (sequelize, DataTypes) => (
  sequelize.define('payments', {
    product_pets_id: {type: DataTypes.INTEGER, allowNull: false, references: {model: models.product_pets, key: 'id'}},
    paid_date: {type: DataTypes.DATE}
  }, {
    classMethods: {},
    tableName: 'payments',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
);