const path = require('path')
const fs = require("fs")


async function build() {
    try {
        await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
        let newTemplate = await fs.promises.readFile(path.join(__dirname, "template.html"), 'utf-8');
        await fs.promises.writeFile((path.join(__dirname, "project-dist", "index.html")), newTemplate);
        let newFileIndex = await fs.promises.readFile(path.join(__dirname, "project-dist", "index.html"), "utf-8");
        let result = newFileIndex.match(/[{]+(\w)+[}]+/g);

        for (let item of result) {
            let newName = item.slice(2, -2)
            let newContent = await fs.promises.readFile(path.join(__dirname, "components", `${newName}.html`), "utf-8")
            let indexFile = await fs.promises.readFile(path.join(__dirname, "project-dist", "index.html"), "utf-8")
            let file = indexFile.replace(item, newContent)
            await fs.promises.writeFile(path.join(__dirname, "project-dist", "index.html"), file)
        }
    }
    catch (err) {
        console.log(err)
    }
}
const newFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))

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
    }
})

fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true }, err => {
    if (err) console.log(err)

    fs.readdir(path.join(__dirname, "project-dist", "assets"), { withFileTypes: true }, (err, files) => {
        if (err) console.log(err)

        files.forEach(file => {
            fs.readdir(path.join(__dirname, "project-dist", "assets"), (err, files) => {
                files.forEach(file => {
                    fs.unlink(path.join(__dirname, "project-dist", "assets", file), (err) => {
                        if (err) console.log(err)
                    });
                })
            })
        })

        fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => {
            if (err) console.log(err)

            files.forEach(file => {
                let oldFile = path.join(__dirname, "assets", file.name)
                let copyFile = path.join(__dirname, "project-dist", "assets", file.name)
                fs.copyFile(oldFile, copyFile), () => {
                    if (err) {
                        console.log(err)
                    } else {
                        fs.mkdir(path.join(__dirname, "project-dist", "assets", file.name), { recursive: true }, err => {
                            if (err) console.log(err);
                            fs.readdir(path.join(__dirname, "assets", file.name), (err, filesDep) => {
                                if (err) console.log(err)
                                else {
                                    filesDep.forEach(fileDep => {
                                        let filePathDep = path.join(__dirname, "assets", file.name, fileDep)
                                        let filePathCopyDep = path.join(__dirname, "project-dist", "assets", file.name, fileDep)
                                        fs.copyFile(filePathDep, filePathCopyDep), (err) => {
                                            if (err) {
                                                console.log(err);
                                            }
                                        }
                                    })

                                }

                            })


                        })
                    }
                }
            })


        })

    })
})

build()