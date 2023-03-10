'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      School.hasMany(models.Applicant, {as: 'School', foreignKey: 'idSchool'});
    }
  }
  School.init({
    name: DataTypes.STRING,
    teacher: DataTypes.STRING,
    address: DataTypes.TEXT,
    contact: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'School',
  });
  return School;
};