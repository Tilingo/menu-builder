var express = require('express');
var router = express.Router();
const Menu = require('../models/Menu')
const Section = require('../models/MenuSection')
const Item = require('../models/MenuItem')

router.get('/', function (req, res, next) {
  Menu
    .find()
    .then((listOfMenus) => {
      res.render('menu/index', {
        title: "Menus",
        listOfMenus
      })
    })
    .catch((err) => res.send(err))
});

router.get('/new', (req, res) => {
  res.render('menu/new', {
    title: "New Menu"
  })
})

// CREATE Route
router.post('/', (req, res) => {
  const newMenu = req.body
  Menu
    .create(newMenu)
    .then(() => {
      res.redirect('/menu')
    })
})

module.exports = router;
