const fs = require("fs")
const path = require("path")


const DataFilePath = path.join(__dirname, "userdata.json")

const writeFile = (data) => {
    fs.writeFileSync(DataFilePath, JSON.stringify(data, null, 2))
}

const readFile = () => {
    const data = fs.readFileSync(DataFilePath, "utf8")
    return data ? JSON.parse(data) : []
}

module.exports = { writeFile, readFile }