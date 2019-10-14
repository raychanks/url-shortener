require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const Url = require('./models/Url');

const app = express();

// const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB_NAME } = process.env;
// const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}`;

app.use(express.json());

mongoose
    .connect('mongodb://192.168.99.100:27010/url-shortener-dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Listening to port 3000');
        });
    });

app.get('/', (req, res) => {});

app.get(/\w{8}/, async (req, res) => {
    const shortenedUrl = req.url.slice(1);
    const urlInfo = await Url.findById(shortenedUrl);

    if (urlInfo) {
        res.redirect(urlInfo.url);
    } else {
        res.status(404).send('Url not found');
    }
});
