'use strict';
module.exports = {
  init: db => {
    db['contract_users'].hasMany(db['product_pets'], {foreignKey: 'owner_id'});
    db['product_pets'].hasOne(db['payments'], {foreignKey: 'product_pets_id'});
    db['payments'].belongsTo(db['product_pets'], {foreignKey: 'product_pets_id'});
  }
};