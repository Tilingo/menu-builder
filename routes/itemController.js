var express = require('express');
const router = express.Router({ mergeParams: true })
const Menu = require('../models/Menu');
const Section = require('../models/MenuSection');
const Item = require('../models/MenuItem');

router.get('/new', (req, res) => {
    res.render('item/new', {
        menuId: req.params.menuId,
        tiitle: 'New Item',
        sectionID: req.params.sectionID
    })
})

router.post('/', (req, res) => {

    // make comment req.body
    const item = new Item(req.body)

    // get menu by the id
    Menu.findById(req.params.menuId)
        .then((restaurantMenu) => {

            // push new section to menu
            restaurantMenu.menu_section.id(req.params.sectionID).menu_items.push(item)

            // save the section
            return restaurantMenu.save()
        })
        .then(() => {

            // redirect to comments
            res.redirect(`/menu/`)
        })
})

router.get('/:id', function (req, res, next) {
    Menu
        .findById(req.params.menuId)
        .then((menu) => {
            const item = menu.menu_section.id(req.params.sectionID).menu_items.id(req.params.id)
            res.render('item/show', {
                title: `${item.name}`,
                menu,
                item
            })
        })
        .catch((err) => res.send(err))
});

module.exports = router;