const mongoose = require('mongoose');

// require('.env').config();

const mongoURI = process.env.mongouri;

const connecToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(() => {
            console.log('success');
        }).catch((err) => {
            console.log('no success', err);
        });
}
module.exports = connecToMongo