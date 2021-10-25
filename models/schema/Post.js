/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Post', {
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
    images: {
      type: "ARRAY",
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
    UserId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TopicId: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Post'
  });
};
