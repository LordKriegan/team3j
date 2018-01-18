module.exports = function (sequelize, DataTypes) {
  var Depts = sequelize.define("Depts", {
      // Giving the Dept model a name of type STRING
      name: DataTypes.STRING
  });

  Depts.associate = function (models) {
      // Associating Dept with Items
      // When an Dept is deleted, also delete any associated Items
      Depts.hasMany(models.Items, {
          onDelete: "cascade"
      });
  };
  return Depts;
};