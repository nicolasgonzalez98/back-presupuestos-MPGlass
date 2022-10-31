const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('article', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    })
}