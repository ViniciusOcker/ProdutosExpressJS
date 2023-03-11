
const express = require('express')
const app = express()
const port = 3000

const ProductController = require("./Controller/ProductController")

app.use("/product", ProductController)

app.listen(port, () => {
  console.log(`Executando da porta ${port}`)
})

