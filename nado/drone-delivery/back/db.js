const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nado', 'root', '1703', {
    host: 'localhost',
    dialect: "mysql"
});

sequelize.authenticate()
    .then(()=> console.log("Норм подключено"))
    .catch(() => console.log("Хахахах не подключено",err));

module.exports = sequelize;