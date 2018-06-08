var express = require('express');
const router = express.Router({ mergeParams: true })
const Menu = require('../models/Menu');
const Section = require('../models/MenuSection');
const Item = require('../models/MenuItem');

router.get('/new', (req, res) => {
    res.render('section/new', {
        menuId: req.params.menuId,
        tiitle: 'New Section'
    })
})

router.post('/', (req, res) => {

    // make comment req.body
    const section = new Section(req.body)

    // get homework assignment by the id
    Menu.findById(req.params.menuId)
        .then((restaurantMenu) => {

            // push new comment to comments
            restaurantMenu.menu_section.push(section)

            // save the homework assignment
            return restaurantMenu.save()
        })
        .then(() => {

            // redirect to comments
            res.redirect(`/menu/${req.params.menuId}`)
        })
})

router.get('/:id/edit', (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Menu
        .findById(req.params.menuId)
        .then((menu) => {
            function findIndex(element) {
                return element._id == ID;
            }
            let index = menu.menu_section.findIndex(findIndex)
            console.log(index)
            const section = menu.menu_section[index]
            res.render('section/edit', {
                title: "Edit Section",
                menu,
                ID,
                section
            })
        })
})


// router.post('/', (req, res) => {
//     const newMenu = req.body
//     Section
//       .create(newMenu)
//       .then(() => {
//         res.redirect('/menu')
//       })
//   })
module.exports = router;
