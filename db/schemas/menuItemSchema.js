const Schema = require('mongoose').Schema

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
      },
    price: Number,
    picture: String
})

module.exports = menuItemSchema