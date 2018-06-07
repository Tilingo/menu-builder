const Schema = require('mongoose').Schema
const menuSchema = require('./menuSchema')
const menuItemSchema = require('./menuItemSchema')

const menuSectionSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    menu_items: [ menuItemSchema ]
})

module.exports = menuItemSchema