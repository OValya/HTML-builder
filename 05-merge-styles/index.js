const fsp = require('fs/promises');
const fs = require('fs');

const path = require('path');
const pathToDist = path.join(__dirname, 'project-dist');
const pathToStyles = path.join(__dirname, 'styles');
console.log(pathToStyles);
async function doSomething(source) {
   const files = await fsp.readdir(source);
   const writeStream = fs.createWriteStream(path.join(pathToDist, 'bundle.css'));
   console.log(files);
   let data = '';
   //let arrStyles = [];
   for (const file of files) {
       const pathToFile = path.join(pathToStyles, file)
       fsp.stat(pathToFile).then((stats)=>{
           if(stats.isFile && path.extname(file)==='.css'){
             const readStream = fs.createReadStream(pathToFile, 'utf-8');
             readStream.on('data', partData => data += partData);
             //arrStyles.push(data);
             readStream.on('end', ()=> writeStream.write(data));
        }
       })
   }
}

doSomething(pathToStyles);
