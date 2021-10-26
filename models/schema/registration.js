/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Registration', {
    objectId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    textPassword: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Registration'
  });
};
