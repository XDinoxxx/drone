const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const orders = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    delivery_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weigth: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    dimensions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_id: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
}, {
    tableName: 'orders',
    timestamps: false,
})

module.exports = orders