const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name: String,
    imageMain: String,
    image1: String,
    image2: String,
    image3: String,
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;