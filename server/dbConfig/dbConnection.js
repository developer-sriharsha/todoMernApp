const mongoose = require('mongoose')
require('dotenv').config()
const dbConnection = async () => {
    try {

        //here username and passwords are replaced for the sucurity purpose
        const mongodbURL = "mongodb+srv://<username>:<password>@portfolio-qhmju.mongodb.net/TodoApp?retryWrites=true&w=majority";
        //Set up default mongoose connection
        mongoose.connect(mongodbURL, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
        });

        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;

        //Get the default connection
        const db = mongoose.connection;
        db.once('open', () => console.log('connected to the database', db.name));

        // checks if connection with the database is successful
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        // #########################################

    } catch (error) {
        console.log("error", error)
    }

}
module.exports = dbConnection
