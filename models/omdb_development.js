'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class omdb_development extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  omdb_development.init({
    title: DataTypes.STRING,
    imdbid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'omdb_development',
  });
  return omdb_development;
};