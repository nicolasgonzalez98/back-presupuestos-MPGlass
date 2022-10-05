const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('budget', {
        is_approved: {
            type: DataTypes.BOOLEAN,
        }
    })
}