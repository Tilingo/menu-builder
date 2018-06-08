var express = require('express');
var router = express.Router();
const Menu = require('../models/Menu');
const Section = require('../models/MenuSection');
const Item = require('../models/MenuItem');

router.get('/new', (req, res) => {
    res.render('section/new', {
      menuId: req.params.menuId,
      tiitle: 'New Section'
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
