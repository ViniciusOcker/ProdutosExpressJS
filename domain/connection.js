const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'product'
})

connection.connect()
connection.query("CREATE TABLE IF NOT EXISTS products(id BIGINT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(250) NOT NULL UNIQUE, description VARCHAR(5000) NOT NULL, price FLOAT NOT NULL)")
connection.query("CREATE TABLE IF NOT EXISTS users(id BIGINT PRIMARY KEY AUTO_INCREMENT, fisrtname VARCHAR(150) NOT NULL, lastname VARCHAR(150) NOT NULL, nickname VARCHAR(25) NOT NULL UNIQUE, email VARCHAR(400) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL, roles VARCHAR(25) NOT NULL)")
exports = connection