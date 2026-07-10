// import { mongoose } from "mongoose"
const mongoose = require("mongoose")

async function connectDB(db_url) {
    try {
        return await mongoose.connect(db_url)
            .then(() => {
                console.log("DB connected Successfully!");
            })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    connectDB
};

