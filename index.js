require('dotenv').config();

const express = require('express');

const app = express();

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_DB_NAME } = process.env;
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}`;

app.get('/', (req, res) => {
    res.redirect('https://www.google.com');
});

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
