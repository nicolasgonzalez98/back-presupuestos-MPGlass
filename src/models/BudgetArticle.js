const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('budgetArticle', {
        quantity: {
            type: DataTypes.INTEGER,
            
        },
        weight: {
            type: DataTypes.INTEGER,
            
        },
        width: {
            type: DataTypes.INTEGER,
            
        },
        height: {
            type: DataTypes.INTEGER,
            
        },
        price: {
            type: DataTypes.INTEGER,
            
        }
    })
}