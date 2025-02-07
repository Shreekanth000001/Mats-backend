const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://shreekanthk000001:shreekanthadmin1@matsdb.s22pl.mongodb.net/mats";
const connecToMongo = async () => {
    if (!mongoURI) {
        console.error("❌ MONGO_URI is undefined. Make sure it is set in Koyeb.");
        return;
    }

    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        autoIndex: false
    })
    .then(() => console.log(" Connected to MongoDB"))
    .catch((err) => console.error(" MongoDB connection error:", err));
}
module.exports = connecToMongo