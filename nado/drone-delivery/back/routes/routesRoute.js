const express = require('express')
const router = express.Router()
const route = require('../models/routes')

router.post('/create', async (req, res) => {
    try {
        const { orderId, droneId, startPoint, endPoint, distance } = req.body;

        if (!orderId || !droneId || !startPoint || !endPoint || !distance) {
            return res.status(400).json({ message: "Заполните все поля!" });
        }

        const newRoute = await route.create({
            order_id: orderId,
            drone_id: droneId,
            start_point: startPoint,
            end_point: endPoint,
            distance
        });

        res.status(201).json({ message: "Маршрут создан", route: newRoute });
    } catch (error) {
        console.error("Ошибка при создании маршрута:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

module.exports = router