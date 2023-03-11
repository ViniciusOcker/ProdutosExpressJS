const con = require("./connection");
const { v4: uuidv4 } = require("uuid");

const create = (name, description, price, res, ignore) => {
    con.con.query(
    "SELECT * FROM produtos WHERE name LIKE ?",
    [name],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4();
            console.log("[Code: " + uuid + " create select name]" + err.stack);
            res.status(500);
            res.send(`Internal error [code: ${uuid} ]`);
        } else if (results.length) {
            res.status(400);
            res.send(`O produto ${name} já está registrado!`);
        } else {
            con.con.query(
            "INSERT INTO produtos (name, description, price) VALUES (?, ?, ?)",
            [name, description, price],
            (err, results, fields) => {
                if (err) {
                    let uuid = uuidv4();
                    console.log("[Code: " + uuid + " create select id]" + err.stack);
                    res.status(500);
                    res.send(`Internal error [code: ${uuid} ]`);
                } else {
                    con.con.query(
                    "SELECT * FROM produtos WHERE name LIKE ?",
                    [name],
                    (err, results, fields) => {
                        if (err) {
                            let uuid = uuidv4();
                            console.log("[Code: " + uuid + " create select name]" + err.stack);
                            res.status(500);
                            res.send(`Internal error [code: ${uuid} ]`);
                        } else {
                            res.json(results[0]);
                        }
                    });
                }
            });
        }
    });
};

const findAll = (res) => {
    con.con.execute(
    "SELECT * FROM produtos",
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4();
            console.log("[Code: " + uuid + " findall select all ]" + err.stack);
            res.status(500);
            res.send(`Internal error [code: ${uuid} ]`);
        } else {
            res.json(results);
        }
    });
};

const findById = (id, res) => {
    con.con.query(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4();
            console.log("[Code: " + uuid + " findById select id ]" + err.stack);
            res.send(`Internal error [code: ${uuid} ]`);
            res.status(500);
        } else if (results.length != 0) {
            res.json(results);
        } else {
            res.status(404);
            res.send(`Este produto não existir!`);
        }
    });
};

const update = (name, description, price, res, id) => {
    con.con.query(
    "SELECT * FROM produtos WHERE id = ?",
    [id],
    (err, results, fields) => {
        if (err) {
            let uuid = uuidv4();
            console.log("[Code: " + uuid + " update select id ]" + err.stack);
            res.send(`Internal error [code: ${uuid} ]`);
            res.status(500);
        } else if (results.length === 0) {
            res.status(404);
            res.send(`Este produto não existir!`);
        } else {
            con.con.query(
            "SELECT * FROM produtos WHERE name LIKE ?",
            [name],
            (err, results, fields) => {
                if (err) {
                    let uuid = uuidv4();
                    console.log("[Code: " + uuid + " update select name ]" + err.stack);
                    res.status(500);
                    res.send(`Internal error [code: ${uuid} ]`);
                } else if (results.length) {
                    res.status(400);
                    res.send(`O produto ${name} já está registrado!`);
                } else {
                    con.con.query(
                    "UPDATE produtos SET name = ? , description = ? , price = ? WHERE id = ?",
                    [name, description, price, id],
                    (err, results, fields) => {
                        if (err) {
                            let uuid = uuidv4();
                            console.log("[Code: " + uuid + " update update ]" + err.stack);
                            res.status(500);
                            res.send(`Internal error [code: ${uuid} ]`);
                        }
                        else{
                            con.con.query(
                            "SELECT * FROM produtos WHERE name LIKE ?",
                            [name],
                            (err, results, fields) => {
                                if (err) {
                                    let uuid = uuidv4();
                                    console.log("[Code: " + uuid + " update select name ]" + err.stack);
                                    res.status(500);
                                    res.send(`Internal error [code: ${uuid} ]`);
                                } else {
                                    res.json(results[0]);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.create = create;
exports.findAll = findAll;
exports.findById = findById;
exports.update = update;
