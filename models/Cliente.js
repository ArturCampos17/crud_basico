const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Usuario = require('./Usuario');  // Certifique-se de que o caminho está correto

const Cliente = sequelize.define('Cliente', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  nome: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    references: {
        model: 'Usuario', // Nome da tabela referenciada
        key: 'email'
    },
    allowNull: false
},
  cpf: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
  tableName: 'Cliente', // Verifique se o nome da tabela está correto aqui
  timestamps: false //  createdAt e updatedAt
});

module.exports = Cliente;