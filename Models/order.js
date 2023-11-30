const Sequelize=require('sequelize');
const sequelize=require('../utilities/database');

const Order=sequelize.define('order',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports= Order;