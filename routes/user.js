const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

// router function
router.get('/calendar',(req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','calendar.html'));
    res.render('calendar', { pageTitle: 'Engineer Buddies',
    path: '/calendar'  });
});

router.get('/',(req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','main.html'));
    res.render('main-engineer', { pageTitle: 'Engineer Buddies',
    path: '/'  });
});

module.exports = router;
