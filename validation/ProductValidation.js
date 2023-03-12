const validationText = (text, min, max, campo) => {
    if(!text){
        return `Este campo ${campo} está vazio!`
    }
    else if(typeof(text) !== "string"){
        return `O ${campo} precisa ser um texto!`
    }
    else if(text.length < min){
        return `O ${campo} é muito curto!`
    }
    else if(text.length > max){
        return `O ${campo} é muito longo!"`
    }
    else {
        return null
    }
}

const validationPrice = (price) =>{
    if(!price){
        return "o preço não pode está vazio!"
    }
    else if(typeof(price) !== "number"){
        return "O preço precisa ser um número!"
    }
    else if(price < 0.01 ){
        return "O preço não pode ser menor do que 0,01!"
    }
    return null
}

const validation = (name,description,price,res,func,id) => {
    let error = {
        name: validationText(name, 2, 250, "nome"),
        description: validationText(description, 10, 5000, "descrição"),
        price: validationPrice(price),
    }

    if(error.name == null && error.description == null && error.price == null){
        func(name,description,price,res,id)
    }
    else {
        res.status(400)
        res.json(error)
    }
}

exports.validation = validation
exports.validationText = validationText
exports.validationPrice = validationPrice