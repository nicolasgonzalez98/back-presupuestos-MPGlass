const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('article', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        area_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        unity_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: DataTypes.STRING
        },
        unity: {
            type: DataTypes.STRING
        }
    })
}