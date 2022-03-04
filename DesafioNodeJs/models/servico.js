'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {
 
    static associate(models) {
     
      Servico.belongsToMany(models.Pedido,{
        foreignKey: 'PedidoId', through: 'ItemPedido', as: 'Pedidos_serv'});
     
      Servico.hasMany(models.ItemPedido, {
        foreignKey: 'ServicoId', as: 'Item_Servicos'});
    }
  };
  Servico.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Servico',
  });
  return Servico;
};