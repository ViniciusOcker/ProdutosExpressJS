var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var router = express.Router();

const ProductDomain = require("../domain/ProductDomain");

router.get('/', function (req, res){
    ProductDomain.readAll(res)
})

router.get('/:id', function (req, res){
    ProductDomain.readById(req.params.id, res)
})

router.post('/', jsonParser, (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    ProductDomain.save(name, description, price, res)
})

module.exports = router;