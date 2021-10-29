const fs = require('fs');
const path = require('path');
let data = '';
//console.log(path.join(__dirname, 'text.txt'));
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readStream.on('data', partData => data += partData);
readStream.on('end', () => console.log(data.trim()));