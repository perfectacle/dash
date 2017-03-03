'use strict';
const models = require('./index');

module.exports = (sequelize, DataTypes) => (
  sequelize.define('payments', {
    paid_date: {type: DataTypes.DATE}
  }, {
    classMethods: {},
    tableName: 'payments',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
);