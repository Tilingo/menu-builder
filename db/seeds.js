const mongoose = require('mongoose')
const Menu = require('../models/Menu')
const MenuItem = require('../models/MenuItem')
const MenuSection = require('../models/MenuSection')

// Connect to Database
mongoose.connect('mongodb://localhost/menu_builder')
  .then(() => {
    console.log('connected to mongoDB')
  })
  .catch((err) => {
    console.log('ERROR', err)
  })

// Remove old Menu Data
Menu.remove()
  .then(() => {
    const item1 = new MenuItem({
        name: "Arepa Reina Pepeada",
        description: `Arepa rellena con pollo, aguacate y mayonesa`,
        price: 9.99,
        picture: "https://media-cdn.tripadvisor.com/media/photo-s/09/a0/ac/bb/samantha-s-gift.jpg"
    })

    const item2 = new MenuItem({
        name: "Arepa Carne Mechada",
        description: `Arepa rellena con carne mechada guisada`,
        price: 9.99,
        picture: "https://media-cdn.tripadvisor.com/media/photo-s/0d/96/2f/91/arepa-asada-al-grill.jpg"
    })

    const item3 = new MenuItem({
        name: "Arepa Pabellon Criollo",
        description: `Arepa rellena con carne mechada, frijoles negros, platanos maduros y queso blanco`,
        price: 10.99,
        picture: "http://nonabrooklyn.com/wp-content/uploads/2013/01/The-Arepa-Pabellon-at-Arepera-Guacuco-in-Bushwick-Brooklyn-%C2%A9-Morgan-Ione-Yeager.jpg"
    })

    
    const section1 = new MenuSection({
        name: "Arepas",
        menu_items: item1
    })

    const section2 = new MenuSection({
        name: "Mas Arepas",
        menu_items: [ item2 ]
    })

    const section3 = new MenuSection({
        name: "Y mas Arepas",
        menu_items: [ item3 ]
    })
    
    const menu = new Menu({
        name: "La arepera de Nestor",
        category: "Venezuelan food",
        menu_section: [ section1, section2, section3 ],
        picture: "https://media-cdn.tripadvisor.com/media/photo-s/09/ba/ff/12/arepera-la-carajita.jpg"
    })


    // save test data
    return Menu.insertMany(menu)
  })
  .then(() => {

    // close the database
    mongoose.connection.close()
  })