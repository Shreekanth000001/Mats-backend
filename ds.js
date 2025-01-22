const mongoose = require('mongoose');

// require('.env').config();

const mongoURI = process.env.MONGO_URI;

const connecToMongo = async () => {
     await mongoose.connect(mongoURI)
        .then(() => {
            console.log('success');
        }).catch((err) => {
            console.log('no success', err);y
        });



}


module.exports = connecToMongo