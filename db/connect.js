const { default: mongoose } = require("mongoose")

require("dotenv").config()

const connectDB = async () => {
    const url = process.env.MONGO_URL
     await mongoose.connect(url, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Connected to MongoDB!`.cyan.underline.bold)
    })
}

module.exports = connectDB;