'use strict';
module.exports = (sequelize, DataTypes) => (
  sequelize.define('product_pets', {
    kind: {type: DataTypes.STRING(100)},
    name: {type: DataTypes.STRING(80), allowNull: false},
    birth: {type: DataTypes.DATE, allowNull: false},
    age: {type: DataTypes.STRING(5)},
    sex: {type: DataTypes.STRING(10), allowNull: false},
    plan: {type: DataTypes.STRING(20), allowNull: false},
    ratio: {type: DataTypes.STRING(20), allowNull: false},
    cost: {type: DataTypes.STRING(20)}
  }, {
    classMethods: {},
    tableName: 'product_pets',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })
);