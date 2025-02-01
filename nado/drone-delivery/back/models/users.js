const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
})

module.exports = users