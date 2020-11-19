'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave extends Model {
  
    static associate(models) {
      // define association here
    }
  };
  fave.init({
    title: DataTypes.STRING,
    imbid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fave',
  });
  return fave;
};