'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gamer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gamer.init({
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    select: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    status: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Gamer',
  });
  return Gamer;
};