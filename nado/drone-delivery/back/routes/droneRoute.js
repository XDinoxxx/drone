const express = require('express')
const router = express.Router()
const drone = require('../models/drones')
const db = require('../db')

router.get('/alldrones', async (req,res) => { 
    try {  
        // Получаем всех дронов 
        const drones = await drone.findAll();  
         
        // Опустим детали соединения с базой данных 
        const statuses = await db.query('SELECT * FROM statusdrone;');  
        const statusMap = {};  
        console.log('Данные statusdrone', statuses); 
        
        // Проверяем, если массив статусов не пуст
        if (statuses.length > 0) {
            const flatStatuses = statuses.flat(); // или statuses[0]
            flatStatuses.forEach(status => { 
                statusMap[status.id] = status.status;  
            });
        }
         
        // Формируем финальный JSON 
        const result = drones.map(drone => { 
            return { 
                id: drone.id,  // Добавляем ID дрона
                model: drone.model, 
                status: statusMap[drone.status_id] || 'Unknown', // Получаем статус по status_id 
                battery_level: drone.battery_level 
            }; 
        });
         
        res.json(result);  
    } catch (error) {  
        console.error("Ошибка при получении списка дронов:", error); 
        res.status(500).json({ message: 'Ошибка сервера' });  
    }  
});


router.post('/createdrone', async (req,res) => {
    try {
        const {model, status_id, battery_level} = req.body
        console.log('Получены данные', model,status_id,battery_level)
        const newDrone = await drone.create({model, status_id, battery_level})
        res.status(201).json({message: 'Дрон успешно добавлен'})
    } catch (error) {
        res.status(501).json({message: 'Ошибка создания дрона'})
    }
})

module.exports = router