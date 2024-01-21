const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name: String,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e8fa9d6 (delivering country service changes)
    imageMain: Buffer,
    image1: Buffer,
    image2: Buffer,
    image3: Buffer,
<<<<<<< HEAD
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
=======
    imageMain: String,
    image1: String,
    image2: String,
    image3: String,
=======
>>>>>>> e8fa9d6 (delivering country service changes)
    description: String,
})

const Country = mongoose.model('Country', countrySchema);
<<<<<<< HEAD
>>>>>>> 3d0b519 (created schema for my countryModel in DB)
=======
module.exports = Country;
>>>>>>> e8fa9d6 (delivering country service changes)
