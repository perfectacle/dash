'use strict';
module.exports = (sequelize, DataTypes) => (
  sequelize.define('payments', {
    paid_date: {type: DataTypes.DATE},
    type: {type: DataTypes.STRING(30), allowNull: false},
    status: {type: DataTypes.STRING(15)}
  }, {
    classMethods: {},
    tableName: 'payments',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
);