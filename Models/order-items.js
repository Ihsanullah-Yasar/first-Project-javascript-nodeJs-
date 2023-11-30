const Sequelize=require('sequelize');
const sequelize=require('../utilities/database');
// this is a table like pivot table in laravel
const OrderItems=sequelize.define('orderItems',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports= OrderItems;