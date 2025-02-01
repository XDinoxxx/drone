const express = require('express')
const sequelize = require('./db')
const userRoute = require('./routes/usersRoute')
const droneRoute = require('./routes/droneRoute')
const orderRoute = require('./routes/orderRoute')
const routesRoute = require('./routes/routesRoute')

const cors = require('cors')

const app = express()

const PORT = 3001

app.use(express.json())
app.use(cors())

sequelize.sync({ alter: true })
    .then(() => console.log("Схемы синхноризированы"))
    .catch(err => console.error('Ошибка синхронизации', err))

app.use('/userapi', userRoute)
app.use('/droneapi', droneRoute)
app.use('/orderapi', orderRoute)
app.use('/routeapi', routesRoute)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
})