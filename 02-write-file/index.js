const { stdin, stdout } = process
const fs = require('fs')
const path = require('path')

const pathText = path.join(__dirname, 'newFile.txt');

const writeStream = fs.createWriteStream(pathText);

// fs.writeFile(
//     pathText,
//     (error) => {
//         if (error) throw error;
//     }
// )
stdout.write("Введите текст!")

// const path = require('path');
// const fs = require('fs');
// const readline = require('readline');
// const process = require('process');
// const input = process.stdin;
// const output = process.stdout;

// const rl = readline.createInterface({
//     input,
//     output
// });

// rl.write('Hello, input your world\n');

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
