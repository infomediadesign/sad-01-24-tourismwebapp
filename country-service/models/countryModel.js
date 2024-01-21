const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name: String,
<<<<<<< HEAD
    imageMain: Buffer,
    image1: Buffer,
    image2: Buffer,
    image3: Buffer,
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
=======
    imageMain: String,
    image1: String,
    image2: String,
    image3: String,
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
>>>>>>> 3d0b519 (created schema for my countryModel in DB)
