module.exports = function (sequelize, DataTypes) {
    var News = sequelize.define("News", {
        news: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return News;
  };