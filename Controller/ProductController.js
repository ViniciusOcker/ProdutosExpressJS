var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var router = express.Router();

ProductService = require("../service/ProductService");

router.get('/', function (req, res){
    ProductService.readAll(res)
})

router.post('/', jsonParser, (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    ProductService.save(name, description, price, res)
})

router.get('/:id', function (req, res){
    ProductService.readById(req.params.id, res)
})

router.put("/:id", jsonParser, function (req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    ProductService.update(req.params.id, name, description, price, res)
})

module.exports = router;