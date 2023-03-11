const con = require('./connection');
const { v4: uuidv4 } = require('uuid');

const save = (name, description, price, res) => {
    con.con.query(
        "INSERT INTO produtos (name, description, price) VALUES (?, ?, ?)",
        [name, description, price],
        (err, results, fields) => {
            if(err){
                let uuid = uuidv4();
                console.log("[Code: " + uuid + " ]" + err);
                res.status(500)
                res.send(`Internal error [code: ${uuid} ]`)
            }
            else{
                con.con.query(
                    "SELECT * FROM produtos WHERE name LIKE ?",
                    [name],
                    (err, results, fields) => {
                        if(err){
                            let uuid = uuidv4();
                            console.log("[Code: " + uuid + " ]" + err);
                            res.status(500);
                            res.send(`Internal error [code: ${uuid} ]`)
                        }
                        else{
                            res.json(results[0]);
                        }
                    }
                );
            }
        }
    );
}
const readAll = (res) =>{
    con.con.execute(
        "SELECT * FROM produtos",
        (err, results, fields) => {
            if(err){
                let uuid = uuidv4();
                console.log("[Code: " + uuid + " ]" + err);
                res.status(500)
                res.send(`Internal error [code: ${uuid} ]`);
            }
            else{
                res.json(results)
            }
        }
    );
}
const readById = (id, res) =>{
    con.con.query(
        "SELECT * FROM produtos WHERE id = ?",
        [id],
        (err, results, fields) => {
            if(err){
                let uuid = uuidv4();
                console.log("[Code: " + uuid + " ]" + err);
                res.send(`Internal error [code: ${uuid} ]`)
                res.status(500);
            }
            else if(results.length != 0){
                res.json(results);
            }
            else{
                res.status(404)
                res.send(`Este produto não existir!`);
            }
        }
    );
}

exports.save = save;
exports.readAll = readAll;
exports.readById = readById;