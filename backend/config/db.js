const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Connected to database');
    } catch (err) {
        console.log(`Error connecting it with database ${err}`);
        process.exit();
    }
}

module.exports = connectDB; 