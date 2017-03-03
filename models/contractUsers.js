'use strict';
const models = require('./index');

module.exports = (sequelize, DataTypes) => (
  sequelize.define('contract_users', {
    name: {type: DataTypes.STRING(20), allowNull: false},
    sex: {type: DataTypes.STRING(10)},
    phone: {type: DataTypes.STRING(20), allowNull: false},
    email: {type: DataTypes.STRING},
    homeaddress: {type: DataTypes.STRING},
  }, {
    classMethods: {},
    tableName: 'contract_users',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
);