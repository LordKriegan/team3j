module.exports = function (sequelize, DataTypes) {
    var Dept = sequelize.define("Dept", {
        // Giving the Dept model a name of type STRING
        name: DataTypes.STRING
    });

    Dept.associate = function (models) {
        // Associating Dept with Items
        // When an Dept is deleted, also delete any associated Items
        Dept.hasMany(models.Item, {
            onDelete: "cascade"
        });
    };
    return Dept;
};