const UserDomain = require("../domain/UserDomain")
const UserValidation = require("../validation/UserValidation")

const register  = (fisrtName, lastName, nickname, email, password, res) => {
    UserValidation.validationRegister(fisrtName, lastName, nickname, email, password, res, ProductDomain.register)
}

const login  = (nickname, password, res) => {
    UserValidation.validationLogin(nickname, password, res, ProductDomain.auth)
}

exports.register = register
exports.login = login
