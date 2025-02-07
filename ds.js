const mongoose = require('mongoose');

// require('.env').config();

const mongoURI = "mongodb+srv://shreekanthk000001:shreekanthadmin1@matsdb.s22pl.mongodb.net/mats";

const connecToMongo = async () => {
    await mongoose.connect(mongoURI)
        .then(() => {
            console.log('success');
        }).catch((err) => {
            console.log('no success', err);
        });
}
module.exports = connecToMongo