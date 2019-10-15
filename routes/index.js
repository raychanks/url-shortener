const express = require('express');

const Url = require('../models/Url');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index');
});

router.post('/', async (req, res) => {
    const { url } = req.body;

    const urlInfoFromDb = await Url.findOne({ url });

    if (urlInfoFromDb) {
        res.send({ shortenedUrl: urlInfoFromDb._id });

        return;
    }

    const urlInfo = await Url.create({ url });

    res.send({ shortenedUrl: urlInfo._id });
});

router.get(/\w{8}/, async (req, res) => {
    const shortenedUrl = req.url.slice(1);
    const urlInfo = await Url.findById(shortenedUrl);

    if (urlInfo) {
        const redirectUrl = /^https?:\/\//.test(urlInfo.url)
            ? urlInfo.url
            : `http://${urlInfo.url}`;

        res.redirect(redirectUrl);
    } else {
        res.status(404).send('Url not found');
    }
});

module.exports = router;
