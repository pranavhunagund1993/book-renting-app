const jwt = require('jsonwebtoken')

const createLoginToken = (id) => {
    return jwt.sign(id, process.env.SECRET_TOKEN, { expiresIn: '1d'})
}

module.exports = { createLoginToken }   // typed or const or named exports