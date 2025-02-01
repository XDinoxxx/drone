const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const drones = sequelize.define('drones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_id: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    battery_level : {
        type: DataTypes.TINYINT,
        allowNull: false
    },
}, {
    tableName: 'drones',
    timestamps: false
})

module.exports = drones