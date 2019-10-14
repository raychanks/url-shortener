require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const Url = require('./models/Url');
const indexRouter = require('./routes/');

const app = express();

// const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB_NAME } = process.env;
// const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}`;

app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use('/', indexRouter);

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
