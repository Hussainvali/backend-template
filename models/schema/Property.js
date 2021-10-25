/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Property', {
    objectId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    locality: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    carpetArea: {
      type: DataTypes.TEXT,
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
    thumbnail: {
      type: "ARRAY",
      allowNull: true
    },
    images: {
      type: "ARRAY",
      allowNull: true
    }
  }, {
    tableName: 'Property'
  });
};
