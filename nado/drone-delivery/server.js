const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

const FRONTEND_DIR = path.join(__dirname, 'front')

app.use(express.static(FRONTEND_DIR))

app.get('*', (req,res) => {
    res.sendFile(path.join(FRONTEND_DIR, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Фронтенд запущен на порту ${PORT}`);
    console.log(`Откройте в браузере: http://localhost:${PORT}`);
})