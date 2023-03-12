
const express = require('express')
const app = express()
const port = 3000

const swagger = require("./docs/swaggerConfiguration");

const ProductController = require("./Controller/ProductController")

app.use("/", swagger)
app.use("/product", ProductController)

app.listen(port, () => {
  console.log(`Executando da porta ${port}`)
})

