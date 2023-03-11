const ProductDomain = require("../domain/ProductDomain")
const ProductValidation = require("../validation/ProductValidation")

const save = (name, description, price, res) => {
    ProductValidation.validation(name,description,price,res,ProductDomain.create, null)
}

const readAll = (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    if(page == undefined){
        page = 1;
    }
    if(limit == undefined){
        limit = 50;
    }
    limit = Number(limit)
    page = Number(page)
    ProductDomain.findAll(res, limit, page)
}

const readById = (id, res) => {
    ProductDomain.findById(id, res)
}

const update = (id, name, description, price, res) => {
    ProductValidation.validation(name,description,price,res,ProductDomain.update,id)
}

const del = (id, res) => {
    ProductDomain.del(id, res)
}

exports.save = save
exports.readAll = readAll
exports.readById = readById
exports.update = update
exports.del = del