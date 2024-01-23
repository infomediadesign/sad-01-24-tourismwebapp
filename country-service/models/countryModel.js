const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name: String,
    imageMain: Buffer,
    image1: Buffer,
    image2: Buffer,
    image3: Buffer,
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;