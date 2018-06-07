const mongoose = require('mongoose')
const menuItemSchema = require('../db/schemas/menuItemSchema')

const Item = mongoose.model('item', menuItemSchema)

module.exports = Item