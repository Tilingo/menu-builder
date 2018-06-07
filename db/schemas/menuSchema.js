const Schema = require('mongoose').Schema
const menuSectionSchema = require('./menuSectionSchema')
const menuItemSchema = require('./menuItemSchema')

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    menu_section: [menuSectionSchema],
    picture: String
})

module.exports = menuSchema