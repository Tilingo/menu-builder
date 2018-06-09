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
            res.redirect(`/menu/${req.params.menuId}`)
        })
})

router.get('/:id', function (req, res, next) {
    Menu
        .findById(req.params.menuId)
        .then((menu) => {
            const item = menu.menu_section.id(req.params.sectionID).menu_items.id(req.params.id)
            const section = menu.menu_section.id(req.params.sectionID)
            res.render('item/show', {
                title: `${item.name}`,
                menu,
                item,
                section
            })
        })
        .catch((err) => res.send(err))
});

router.get('/:id/edit', (req, res) => {
    Menu
        .findById(req.params.menuId)
        .then((menu) => {
            const item = menu.menu_section.id(req.params.sectionID).menu_items.id(req.params.id)
            const section = menu.menu_section.id(req.params.sectionID)
            res.render('item/edit', {
                title: "Edit Item",
                menu,
                item,
                section
            })
        })
        .catch((err) => res.send(err))
})

router.put('/:id', (req, res) => {
    const menuID = req.params.menuId
    const sectionId = req.params.sectionID
    const itemId = req.params.id
    const updateItem = req.body

    Menu.findById(menuID).then(menu => {
        const item = menu.menu_section.id(sectionId).menu_items.id(itemId)

        item.name = updateItem.name
        item.description = updateItem.description
        item.price = updateItem.price
        item.picture = updateItem.picture

        return menu.save()
    })
    res.redirect(`/menu/${req.params.menuId}`)
})

router.delete('/:id', (req, res) => {
    const menuID = req.params.menuId
    const sectionId = req.params.sectionID
    const itemID = req.params.id

    Menu.findById(req.params.menuId)
        .then((menu) => {
            const item = menu.menu_section.id(sectionId).menu_items.id(itemID)
            item.remove()
            menu.save()
            res.redirect(`/menu/${req.params.menuId}`)
        })
})

module.exports = router;