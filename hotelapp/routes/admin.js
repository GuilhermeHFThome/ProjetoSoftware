const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/listarreservas', (req, res) => {
    res.send('Pagina de listar reservas')
})

router.get('/cadastrar', (req, res) => {
    res.send('Pagina de cadastro')
})

module.exports = router