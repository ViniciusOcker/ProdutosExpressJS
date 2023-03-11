const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product'
})

connection.connect()
connection.query("CREATE TABLE IF NOT EXISTS products(id BIGINT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(250) NOT NULL UNIQUE, description VARCHAR(5000) NOT NULL, price FLOAT NOT NULL)")

exports.con = connection