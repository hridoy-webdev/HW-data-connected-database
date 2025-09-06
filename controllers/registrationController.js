
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs");
const { readFile, writeFile } = require("../userData/fileReadWrite");
const registerSchema = require("../model/registerSchema");

const registrationController = async (req, res) => {
    let { username, email, phoneNumber, password } = req.body

    let errors = {}
    let patternUsername = /^.{3,50}$/;
    let patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let patternPhoneNumber = /^01\d{9}$/
    let patternPassword = /^.{6,50}$/;

    // password converd to hash
    let hash = await bcrypt.hash(password, 10);

    // validation username.....
    if (!username) {
        errors.username = "User name is Require"
    } else {
        if (!patternUsername.test(username)) {
            errors.username = "User name must be between 3 to 50 characters"
        }
    }
    // validation Email
    if (!email) {
        errors.email = "Email is Require"
    } else {
        if (!patternEmail.test(email)) {
            errors.email = "Enter a valid Email"
        }
    }
    // Validation PhoneNumber
    if (!phoneNumber) {
        errors.phoneNumber = "PhoneNumber is Required"
    } else {
        if (!patternPhoneNumber.test(phoneNumber)) {
            errors.phoneNumber = "Please enter a valid 11 digit phone number"
        }
    }
    // validation Password
    if (!password) {
        errors.password = "Email is Require"
    } else {
        if (!patternPassword.test(password)) {
            errors.password = " Password  must be between 6 to 50 Characters "
        }
    }
    // Errors and Success Data
    if (errors.username || errors.email || errors.password || errors.phoneNumber) {
        res.send(errors)
    } else {
        //Email varification
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "hridoy.webdev01@gmail.com",
                pass: "rgcb klbt lpck hhpg",
            },
        });
        const info = await transporter.sendMail({
            from: 'Registation',
            to: "hridoy.webdev01@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        //userData.json
        const userdata = readFile()
        userdata.push({
            username,
            email,
            password: hash,
            phoneNumber
        })
        writeFile(userdata)

        //Data add to todolish
        const data = new registerSchema({
            username,
            email,
            password: hash,
            phoneNumber
        })
        /*  data.save() */
        res.send(data)
    }
}

module.exports = registrationController


/* Email-> faka thaka jabe na, @thakte hobe
username-> 3 lateer er kom deya jabe na 50 latter er besi deya jabe na, faka thaka jabe na
password: 6 tar boro hote hobe 50tar choto hote hobe
phone: 11 digit thakte hobe , o1 diyw start hote hobe */