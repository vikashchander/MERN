const mongoose = require('mongoose'),
    config = require('config'), //require global config and its uses
    db = config.get('mongoURI'),

    connectDB = async () => {
        try {
            await mongoose.connect(db, {
                useNewUrlParser: true //meaning of this line
            });
            console.log('database is connected ... ');
        } catch (err) {
            console.log(err.message);
            // exit Process           about exit process 
            process.exit(1);
        }
    }

module.exports = connectDB;