const mongoose = require('mongoose')
const menuSchema = require('../db/schemas/menuSchema')

const Menu = mongoose.model('menu', menuSchema)

module.exports = Menu