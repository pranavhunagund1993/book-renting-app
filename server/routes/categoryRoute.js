const categoryRoute = require('express').Router()
const categoryCtrl = require('../controller/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const adminAuth = require('../middleware/adminAuth')

categoryRoute.get('/all', authMiddleware,adminAuth, categoryCtrl.getAll)
categoryRoute.get('/single/:id', authMiddleware, adminAuth, categoryCtrl.getSingle)
categoryRoute.post('/create', authMiddleware,adminAuth, categoryCtrl.create)
categoryRoute.patch('/update/:id',authMiddleware, adminAuth, categoryCtrl.update)
categoryRoute.delete('/delete/:id', authMiddleware, adminAuth, categoryCtrl.delete)

module.exports = categoryRoute


