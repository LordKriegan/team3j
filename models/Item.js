module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    Item.associate = function (models) {
        // We're saying that a Item should belong to an Dept
        // A Item can't be created without an Dept due to the foreign key constraint
        Item.belongsTo(models.Dept, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Item;
};
