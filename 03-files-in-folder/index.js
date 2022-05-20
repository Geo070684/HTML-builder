const path = require('path')
const fs = require("fs")
const secretFolder = path.join(__dirname, "secret-folder")

fs.readdir(secretFolder,  (err, files) => {
    if (err) { console.log(err) }
    else {
        files.forEach(file => {
            fs.stat(path.join(__dirname, "secret-folder", file), (err, stats) => {
                if (err) { console.log(err) }
                else{
                    if(!stats.isDirectory()){
                        console.log(path.parse(path.join(__dirname,'secret-folder', file)).name+'-'+path.extname(path.join(__dirname,'secret-folder',file)).substring(1)+'-'+stats.size)
                    }

                }
            })
        })


    }
})

