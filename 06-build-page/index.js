const path = require('path')
const fs = require("fs")



fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err=>{
    if (err) console.log(err)
})

fs.readFile(path.join(__dirname, "template.html"), 'utf-8', (err, fileTemplate)=>{
    if (err) console.log(err)
    else{
        let newItems=fileTemplate.match(/{{[a-z]+}}/g)
    }
    fs.readdir(path.join(__dirname, "components")),{ withFileTypes: true }, (err, files)=>{
        if (err) console.log(err)
        else{
            let namComponent=files.map(item=>{
                return path.join(__dirname,"components", item.name)
            })
            let arrFiles=[];

        }
    } 
})


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