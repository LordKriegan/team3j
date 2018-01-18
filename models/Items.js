module.exports = function (sequelize, DataTypes) {
  var Items = sequelize.define("Items", {
      itemName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      itemPrice: {
          type: DataTypes.FLOAT,
          allowNull: false
      }
  });

  Items.associate = function (models) {
      // We're saying that a Item should belong to an Dept
      // A Item can't be created without an Dept due to the foreign key constraint
      Items.belongsTo(models.Depts, {
          foreignKey: {
              allowNull: false
          }
      });
  };

  return Items;
};