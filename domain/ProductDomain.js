const con = require("./connection")
const { v4: uuidv4 } = require("uuid")

const create = (name, description, price, res, ignore) => {
    con.con.query(
    "SELECT * FROM products WHERE name LIKE ?",
    [name],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4()
            console.log("[Code: " + uuid + " create select name]" + err.stack)
            res.status(500)
            res.send(`Internal error [code: ${uuid} ]`)
        } else if (results.length) {
            res.status(400)
            res.send(`O produto ${name} já está registrado!`)
        } else {
            con.con.query(
            "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
            [name, description, price],
            (err, results, fields) => {
                if (err) {
                    let uuid = uuidv4()
                    console.log("[Code: " + uuid + " create select id]" + err.stack)
                    res.status(500)
                    res.send(`Internal error [code: ${uuid} ]`)
                } else {
                    con.con.query(
                    "SELECT * FROM products WHERE name LIKE ?",
                    [name],
                    (err, results, fields) => {
                        if (err) {
                            let uuid = uuidv4()
                            console.log("[Code: " + uuid + " create select name]" + err.stack)
                            res.status(500)
                            res.send(`Internal error [code: ${uuid} ]`)
                        } else {
                            res.status(201)
                            res.json(results[0])
                        }
                    })
                }
            })
        }
    })
}

const findAll = (res, limit, page) => {
    con.con.query(
    "SELECT COUNT(*) as quant FROM products",
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4()
            console.log("[Code: " + uuid + " findall select all ]" + err.stack)
            res.status(500)
            res.send(`Internal error [code: ${uuid} ]`)
        } else if(results.length == 1){
            let page_max = Math.ceil(results[0].quant/limit);
            if(limit < 2){
                limit = 2;
            }
            else if(limit > 500){
                limit = 500;
            }
        
            if(page < 1) {
                page = 1;
            }
            else if(page > page_max){
                page = page_max;
            }
            let offset = (limit*(page-1))
            con.con.query(
            "SELECT * FROM products LIMIT ? OFFSET ?",
            [limit, offset],
            (err, results, fields) => {
                if (err) {
                    let uuid = uuidv4()
                    console.log("[Code: " + uuid + " findall select all ]" + err.stack)
                    res.status(500)
                    res.send(`Internal error [code: ${uuid} ]`)
                } else {
                    res.json({
                        page: page,
                        limit: limit,
                        page_max: page_max,
                        products: results
                    })
                }
            })
        }
        else {
            let uuid = uuidv4()
            console.log("Error interno desconhecido! [Code: " + uuid + " result != 1]")
            res.status(500)
            res.send(`Internal error [code: ${uuid} ]`)
        }
    })
}

const findById = (id, res) => {
    con.con.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4()
            console.log("[Code: " + uuid + " findById select id ]" + err.stack)
            res.status(500)
            res.send(`Internal error [code: ${uuid} ]`)
        } else if (results.length != 0) {
            res.json(results)
        } else {
            res.status(404)
            res.send(`Este produto não existir!`)
        }
    })
}

const update = (name, description, price, res, id) => {
    con.con.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4()
            console.log("[Code: " + uuid + " update select id ]" + err.stack)
            res.status(500)
            res.send(`Internal error [code: ${uuid} ]`)
        } else if (results.length === 0) {
            res.status(404)
            res.send(`Este produto não existir!`)
        } else {
            con.con.query(
            "SELECT * FROM products WHERE name LIKE ?",
            [name],
            (err, results, fields) => {
                if (err) {
                    let uuid = uuidv4()
                    console.log("[Code: " + uuid + " update select name ]" + err.stack)
                    res.status(500)
                    res.send(`Internal error [code: ${uuid} ]`)
                } else if (results.length) {
                    res.status(400)
                    res.send(`O produto ${name} já está registrado!`)
                } else {
                    con.con.query(
                    "UPDATE products SET name = ? , description = ? , price = ? WHERE id = ?",
                    [name, description, price, id],
                    (err, results, fields) => {
                        if (err) {
                            let uuid = uuidv4()
                            console.log("[Code: " + uuid + " update update ]" + err.stack)
                            res.status(500)
                            res.send(`Internal error [code: ${uuid} ]`)
                        }
                        else{
                            con.con.query(
                            "SELECT * FROM products WHERE name LIKE ?",
                            [name],
                            (err, results, fields) => {
                                if (err) {
                                    let uuid = uuidv4()
                                    console.log("[Code: " + uuid + " update select name ]" + err.stack)
                                    res.status(500)
                                    res.send(`Internal error [code: ${uuid} ]`)
                                } else {
                                    res.json(results[0])
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

const del = (id, res)=>{
    con.con.query(
    "SELECT * FROM products WHERE id = ?",
    [id],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4()
            console.log("[Code: " + uuid + " update select id ]" + err.stack)
            res.status(500)
            res.send(`Internal error [code: ${uuid} ]`)
        } else if (results.length === 0) {
            res.status(404)
            res.send(`Este produto não existir!`)
        } else {
            con.con.query(
            "DELETE FROM products WHERE id = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    let uuid = uuidv4()
                    console.log("[Code: " + uuid + " update select id ]" + err.stack)
                    res.status(500)
                    res.send(`Internal error [code: ${uuid} ]`)
                }
                else{
                    con.con.query(
                    "SELECT * FROM products WHERE id = ?",
                    [id],
                    (err, results, fields) => {
                        if (err) {
                            let uuid = uuidv4()
                            console.log("[Code: " + uuid + " update select id ]" + err.stack)
                            res.status(500)
                            res.send(`Internal error [code: ${uuid} ]`)
                        } else if (results.length === 0) {
                            res.status(204)
                            res.send("");
                        }
                        else{
                            res.status(500);
                            res.send("Erro interno: Não foi possivel excluir esse registro!");
                        }
                    })
                }
            })
        }
    })
}

exports.create = create
exports.findAll = findAll
exports.findById = findById
exports.update = update
exports.del = del