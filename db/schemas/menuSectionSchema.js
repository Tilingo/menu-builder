const Schema = require('mongoose').Schema
const menuItemSchema = require('./menuItemSchema')

const menuSectionSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    menu_items: [ menuItemSchema ]
})

module.exports = menuSectionSchema