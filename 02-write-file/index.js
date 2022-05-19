const fs = require('fs')
const path = require('path')
const readline=require('readline')
const { stdin: input, stdout: output }=require('process')

const pathText = path.join(__dirname, 'newFile.txt');
const writeStream = fs.createWriteStream(pathText, "utf-8");
const rl=readline.createInterface({input, output});

rl.write('Hello, input your world, please)\n');

rl.on("line", (text)=>{
if(text.toString().trim() !== "exit"){
  writeStream.write(`${text}\n`);
    output.write("Good job,try again!)\n")
} else {
    rl.write("Bye! See u soon");
    process.exit()
}
})
rl.on('close',()=>{
    rl.write("Good day!)");
    process.exit()
})


// rl.on('line', (line)=>{

//     if (line !== 'exit') {
//         writeStream.write(line);
//         console.log('good job');
        
//     } else {
//         rl.write('Bye, good day');
//         process.exit(0);
//     }
    
// })

// rl.on('close', ()=> {
//     rl.write('Bye');
//     process.exit(0);
// });
