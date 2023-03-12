const validationName = (name, campo) => {
    if(!name){
        return `Este campo ${campo} está vazio!`
    }
    else if(typeof(name) !== "string"){
        return `O ${campo} precisa ser um texto!`
    }
    else if(name.length < 2){
        return `O ${campo} é muito curto!`
    }
    else if(name.length > 150){
        return `O ${campo} é muito longo!"`
    }
    else{
        name.slice(' ').forEach(word => {
            pattern = /^[A-Za-z\.\-]{2,}$/
            if(word.length < 3){
                return `O ${campo} contém palavras menos do que 2 caracteres!"`
            }
            else if(!pattern.test(word)){
                return `O ${campo} contém caracteres invalidos!"`
            }
            else{
                return null;
            }
        });
    }
}

const validationNickname = (nickname) => {
    pattern = /^[A-Za-z0-9]{5,}$/
    if(!nickname){
        return `O nome do usuário não pode está vazio!`
    }
    else if(typeof(nickname) !== "string"){
        return `O nome do usuário precisa ser um texto!`
    }
    else if(nickname.length < 5){
        return `O nome do usuário é muito curto!`
    }
    else if(nickname.length > 25){
        return `O nome do usuário é muito longo!"`
    }
    else if(!pattern.test(nickname)){
        return `O nome do usuário contém caracteres invalidos!"`
    }
    else {
        return null;
    }
}

const validationEmail = (email) => {
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!email){
        return `O email não pode está vazio!`
    }
    else if(typeof(email) !== "string"){
        return `O email precisa ser um texto!`
    }
    else if(email > 400){
        return `O email é muito longo!"`
    }
    else if(!pattern.test(email)){
        return `O email inserido é invalido!"`
    }
    else {
        return null;
    }
}

const validationPassword = (password) => {
    if(!password){
        return `A senha não pode está vazio!`
    }
    else if(typeof(nickname) !== "string"){
        return `A senha precisa ser um texto!`
    }
    else if(nickname.length < 8){
        return `A senha está muito curto!`
    }
    else if(nickname.length > 50){
        return `A senha está muito longo!"`
    }
    else {
        return null;
    }
}

const validationRegister = (fisrtName, lastName, nickname, email, password, res, func) => {
    let error = {
        fisrtName: validationName(fisrtName, "Primeiro nome"),
        lastName: validationName(lastName, "Sobrenome"),
        nickname: validationNickname(nickname),
        email: validationEmail(email),
        password: validationPassword(password)
    }
    if(error.fisrtName == null && error.lastName == null && error.nickname == null & error.email == null && error.password == null){
        func(fisrtName, lastName, nickname, email, password, res);
    }
    else {
        res.status(400)
        res.json(error)
    }
}

const validationLogin = (nickname, password, res, func) => {
    let error = {
        nickname: validationNickname(nickname),
        password: validationPassword(password)
    }
    if(error.nickname == null & error.password == null){
        func(nickname, password, res);
    }
    else {
        res.status(400)
        res.json(error)
    }
}

exports.validationName = validationName
exports.validationNickname = validationNickname
exports.validationEmail = validationEmail
exports.validationPassword = validationPassword
exports.validationRegister = validationRegister
exports.validationLogin = validationLogin