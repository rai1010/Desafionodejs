"use strict";
const { DATE } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compra.belongsTo(models.Cliente, {
        foreignKey: "ClienteId",
        as: "Clientes",
      });
      Compra.belongsToMany(models.Produto, {
        foreignKey: "ProdutoId",
        through: "ItemCompra",
        as: "Produto_Compra",
      });
      Compra.hasMany(models.ItemCompra, {
        foreignKey: "CompraId",
        as: "Item_Compras",
      });
    }
  }
  Compra.init(
    {
      data: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Compra",
    }
  );
  return Compra;
};