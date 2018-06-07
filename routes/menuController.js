var express = require('express');
var router = express.Router();
const Menu = require('../models/Menu')
const Section = require('../models/MenuSection')
const Item = require('../models/MenuItem')


router.get('/', function(req, res, next) {
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

module.exports = router;
