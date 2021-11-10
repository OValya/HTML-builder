const stdout = process.stdout;
const stdin = process.stdin;
const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(path.dirname(__filename), 'text.txt'));
stdout.write(`Hello! \nEnter text:\n`);
//console.log(path.dirname(__filename));
stdin.on('data', (partData) =>{
    if(partData.toString('utf-8').trimEnd() != "exit") {
        //partData = partData.slice(0, partData.indexOf('exit'));
        output.write(partData);
       }
    else {
        process.exit();
    }
    
});
process.on('exit', ()=> stdout.write('See you later!'));
process.on('SIGINT', ()=>  process.exit());