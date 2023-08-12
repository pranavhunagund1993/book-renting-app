const bookRoute = require('express').Router()
const booksCtrl = require('../controller/bookController')
const authMiddleware = require('../middleware/authMiddleware')
const adminAuth = require('../middleware/adminAuth')

bookRoute.get('/all', authMiddleware, booksCtrl.getAll)
bookRoute.get('/single/:id', authMiddleware, booksCtrl.getSingle)
bookRoute.post('/create', authMiddleware,adminAuth, booksCtrl.create)
bookRoute.patch('/update/:id', authMiddleware,adminAuth, booksCtrl.update)
bookRoute.delete('/delete/:id', authMiddleware,adminAuth, booksCtrl.delete)

module.exports = bookRoute