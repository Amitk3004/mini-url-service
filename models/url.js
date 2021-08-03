const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    expireDateTime: {
        type: Date,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Url', urlSchema);