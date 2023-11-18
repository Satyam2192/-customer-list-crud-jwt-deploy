const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB connected successfully");
            resolve();
        })
        .catch((err) => {
            console.log("Error in connecting to the database");
            console.log(err);
            reject(err); // Reject the promise on connection error
        });
    });
};
