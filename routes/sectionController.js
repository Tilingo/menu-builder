var express = require('express');
const router = express.Router({ mergeParams: true })
const Menu = require('../models/Menu');
const Section = require('../models/MenuSection');
const Item = require('../models/MenuItem');

router.get('/new', (req, res) => {
    Menu
    .findById(req.params.menuId)
    .then((menu) => {
        res.render('section/new', {
            menuId: req.params.menuId,
            tiitle: 'New Section',
            menu
        }) 
    })
})

router.post('/', (req, res) => {

    // make comment req.body
    const section = new Section(req.body)

    // get menu by the id
    Menu.findById(req.params.menuId)
        .then((restaurantMenu) => {

            // push new section to menu
            restaurantMenu.menu_section.push(section)

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
            function sectionIndex(element) {
                return element._id == req.params.id;
            }
            let index = menu.menu_section.findIndex(sectionIndex)
            // console.log(index)
            const section = menu.menu_section[index]
            res.render('section/show', {
                title: `${section.name}`,
                menu,
                section
            })
        })
        .catch((err) => res.send(err))
});

router.get('/:id/edit', (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Menu
        .findById(req.params.menuId)
        .then((menu) => {
            function sectionIndex(element) {
                return element._id == ID;
            }
            let index = menu.menu_section.findIndex(sectionIndex)
            // console.log(index)
            const section = menu.menu_section[index]
            res.render('section/edit', {
                title: "Edit Section",
                menu,
                ID,
                section
            })
        })
})

router.put('/:id', (req, res) => {
    Menu.findOneAndUpdate(
        { "_id": req.params.menuId, "menu_section._id": req.params.id },
        {
            "$set": {
                "menu_section.$": req.body
            }
        },
    ).then(() => {
        res.redirect(`/menu/${req.params.menuId}`)
    })
})

router.delete('/:id', (req, res) => {
    function sectionIndex(element) {
        return element._id == req.params.id;
    }

    Menu.findById(req.params.menuId)
        .then((menu) => {
            let index = menu.menu_section.findIndex(sectionIndex)
            const section = menu.menu_section[index]
            section.remove()
            menu.save()
            res.redirect(`/menu/${req.params.menuId}`)
        })
})

module.exports = router;
