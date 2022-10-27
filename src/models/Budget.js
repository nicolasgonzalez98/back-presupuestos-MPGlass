
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('budget', {
        is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        iva: {
            type: DataTypes.FLOAT
        }
    })
}