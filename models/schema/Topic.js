/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Topic', {
    objectId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
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
    UserId: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Topic'
  });
};
