/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Post', {
    objectId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lat: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lng: {
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
    images: {
      type: "ARRAY",
      allowNull: true
    }
  }, {
    tableName: 'Post'
  });
};
