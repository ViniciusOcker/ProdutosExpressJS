var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var router = express.Router()

router.post('/register', jsonParser, (req, res) => {
    let fisrtName = req.body.fisrtName
    let lastName = req.body.lastName;
    let nickname = req.body.nickname;
    let email = req.body.email;
    let password = req.body.password;
    ProductService.register(fisrtName, lastName, nickname, email, password, res)
})

router.post('/login', jsonParser, (req, res) => {
    let nickname = req.body.nickname;
    let password = req.body.password;
    ProductService.login(nickname, password, res)
})

module.exports = router