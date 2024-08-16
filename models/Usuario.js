const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'Usuario',
    timestamps: false,
  });
  
  module.exports = Usuario;