const express = require('express')
const router = express.Router()
const order = require('../models/orders')
const db = require('../db')

router.get('/order-user-id', async(req,res) => {
    try {
        console.log("Получены заголовки:", req.headers);
        const userId = req.headers['user-id']

        if (!userId) {
            return res.status(400).json({ message: "Отсутствует user_id" });
        }

        const orders = await order.findAll({
            where: {
                user_id: userId
            }
        })

        res.json(orders)
    } catch(error){
        console.error("Ошибка при получении списка товаров:", error); 
        res.status(500).json({ message: 'Ошибка сервера' });  
    }
})

router.get('/allorder', async (req,res) => {
    try{
        const orders = await order.findAll()
        res.json(orders)
    } catch(error){
        console.error("Ошибка при получении списка товаров:", error); 
        res.status(500).json({ message: 'Ошибка сервера' });  
    }
})

router.post('/createorder', async(req,res) => {
    try {
        const {user_id, delivery_address, weigth , dimensions} = req.body
        console.log('Полученные данные', user_id, delivery_address, weigth, dimensions)
        const newOrder = await order.create({
            user_id,
            delivery_address,
            weigth,
            dimensions,
            status_id: 1 
        });
        res.status(201).json({message: 'Заказ успешно добавлен'})
    } catch (error){
        res.status(501).json({message: 'Ошибка создания заказа'})
    }
})

module.exports = router