const jwt = require('jsonwebtoken')

const authMiddleware = async (req,res,next) => {
    try {
        // headers
        const token = req.header('Authorization')

        jwt.verify(token, process.env.SECRET_TOKEN, (err,user) => {
            if(err)
                return res.status(404).json({ msg: 'Token Not Found..'})
            
            // res.json({ user })
            req.user = user   // assigning to request variable
            next(); // send the data to next controller
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authMiddleware