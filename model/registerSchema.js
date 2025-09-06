const mongoose = require("mongoose")
const { Schema } = mongoose


const registerSchema = new Schema({
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
})

module.exports = mongoose.model("Registation", registerSchema)