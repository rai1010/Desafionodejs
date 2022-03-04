'use strict';
const {
  Model 
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pedido.belongsTo(models.Cliente, {ForeignKey: 'ClienteId', as: 'Clientes'});
      Pedido.belongsToMany(models.Servico,{
        ForeignKey: 'ServicoId',
        through: 'ItemPedido', as: 'Servicos_ped'
      });
      Pedido.hasMany(models.ItemPedido, {foreignKey: 'PedidoId', as: 'Item_Pedido'});
    }
  }
  Pedido.init({
    dataPedido: DataTypes.DATEONLY,  
    ClienteId: DataTypes.INTEGER  
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};