
const path = require("path")
const fs = require("fs")

fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, err => {
    if (err) console.log(err)

    fs.readdir(path.join(__dirname, "files-copy"), (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach(file => {
            fs.unlink(path.join(__dirname, "files-copy", file), (err) => {
                if (err) {
                    throw err;
                }
            });
        })

        fs.readdir("04-copy-directory/files", (err, files) => {
            if (err) console.log(err)
            else {
                files.forEach(file => {
                    let oldFile = path.join(__dirname, "files", file)
                    let copyFile = path.join(__dirname, "files-copy", file)
                    fs.copyFile(oldFile, copyFile, err => {
                        if (err) console.log(err)
                    })
                })
            }
        })
        console.log("Папка создана!)")
    })
})