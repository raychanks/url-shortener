const express = require('express');

const Url = require('../models/Url');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index');
});

router.get(/\w{8}/, async (req, res) => {
    const shortenedUrl = req.url.slice(1);
    const urlInfo = await Url.findById(shortenedUrl);

    if (urlInfo) {
        res.redirect(urlInfo.url);
    } else {
        res.status(404).send('Url not found');
    }
});

module.exports = router;
