const stdout = process.stdout;
const stdin = process.stdin;
const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(path.dirname(__filename), 'text.txt'));
stdout.write(`Hello! \nEnter text:\n`);
//console.log(path.dirname(__filename));
stdin.on('data', (partData) =>{
    if(partData.toString().includes('exit')) 
        process.exit();
    else {
        output.write(partData);
    }
});
process.on('exit', ()=> stdout.write('See you later!'));
// ПРОВЕРИТЬ!! process.on('beforeExit', () = stdout.write('Bye!'));