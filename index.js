
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const registrationController = require('./controllers/registrationController')

//connected to MongoDB
mongoose.connect("mongodb+srv://todo:KYP5ipy2Ctkltm2p@cluster0.ola2sgr.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("cennetd");

})

app.use(express.json())

app.post("/register", registrationController)

app.listen("8000", () => {
    console.log("server is running");

})

// KYP5ipy2Ctkltm2p // todo key //