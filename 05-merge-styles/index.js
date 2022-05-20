const path = require('path')
const fs = require("fs")

const newFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))

fs.readdir(path.join(__dirname, "styles"), (err, files) => {
    if (err) console.log(err)

    else {
        files.forEach(file => {
            if (path.extname(path.join(__dirname, "styles", file)) === ".css") {

                let newStream = fs.createReadStream(path.join(__dirname, "styles", file), "utf-8")

                newStream.on("data", chunk => {
                    newFile.write(chunk)
                   
                })
            }


        })
    } console.log("Проверь, файлы должы быть перемещены)")
})