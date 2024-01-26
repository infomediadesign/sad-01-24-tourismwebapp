const mongoose = require('mongoose');

const saveditemSchema = mongoose.Schema({
    place: String,
    custid: String,
    country: String,
    date: {
        type: Date,
        default: Date.now
    },
    description: String,
})

const SavedItem = mongoose.model('saveditems', saveditemSchema);
module.exports = SavedItem;