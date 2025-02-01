const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const routes = sequelize.define('routes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    drone_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_point: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_point: {
        type: DataTypes.STRING,
        allowNull: false
    },
    distance: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'routes',
    timestamps: false
})

module.exports = routes