var express = require('express');
var router = express.Router();
const Menu = require('../models/Menu');
const Section = require('../models/MenuSection');
const Item = require('../models/MenuItem');

router.get('/new', (req, res) => {
    res.render('section/new', {
        title: "New Section"
    })
})

module.exports = router;
