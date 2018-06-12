var express = require('express');
const router = express.Router({ mergeParams: true })

router.get("/", (req, res, next) => {
    res.render('index', {
        title: 'Menu Builder'
    })
})

module.exports = router;
