const mongoose = require('mongoose')
const menuSectionSchema = require('../db/schemas/menuSectionSchema')

const Section = mongoose.model('section', menuSectionSchema)

module.exports = Section