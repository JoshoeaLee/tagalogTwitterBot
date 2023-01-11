const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    tagalog: {
        type: String,
        required: true
    },
    english: {
        type: String,
        required: true,
        default: "Josh forgot to write an English translation"
    },
    wordDate: {
        type: String,
        required: true
    },
    exampleSentence: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Word', wordSchema);