const Sequelize=require('sequelize');
const sequelize=require('../utilities/database');
// this is a table like pivot table in laravel
const CartItem=sequelize.define('cartItems',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports= CartItem;