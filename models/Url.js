const { Schema, model } = require('mongoose');
const { generate } = require('shortid');

const urlSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        default: generate,
    },
});

module.exports = model('Url', urlSchema);
