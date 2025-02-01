const express = require('express')
const router = express.Router()
const user = require('../models/users')

router.post('/reg', async (req,res) => {
    try {
        const { regUsername, regPassword, regPhone, regRole } = req.body;
        console.log("Получены данные для регистрации", regUsername, regPassword, regPhone, regRole)
        const newUser = await user.create({
            username: regUsername, 
            password_hash: regPassword, 
            phone_number: regPhone, 
            role_id: regRole
        })
        res.status(201).json({message: 'Новый пользователь успешно создан'})
    } catch(error) {
        res.status(501).json({error: 'Ошибка создания пользователя'})
    }
})

router.post('/auth', async (req,res) => {
    try {
        const { LoginUsername, LoginPassword } = req.body;
        console.log("Получены данные", LoginUsername, LoginPassword);

        const isUser = await user.findOne({where: {
            username: LoginUsername,
            password_hash: LoginPassword
        }})

        if(!isUser) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        if(isUser.role_id === 1){
            return res.status(201).json({message: 'Вход успешно выполнен', role: 'admin'})
        } else if (isUser.role_id === 2) {
            console.log(isUser.id)
            return res.status(201).json({message: 'Вход успешно выполнен', role: 'client', user_id: isUser.id})
        } else if (isUser.role_id === 3) {
            console.log(isUser.id)
            return res.status(201).json({message: 'Вход успешно выполнен', role: 'operator', user_id: isUser.id})
        }
    } catch (error) {
        console.error("Ошибка", error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
})

module.exports = router