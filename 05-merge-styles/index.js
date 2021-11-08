const fsp = require('fs/promises');
const fs = require('fs');

const path = require('path');
const pathToDist = path.join(__dirname, 'project-dist');
const pathToStyles = path.join(__dirname, 'styles');
//console.log(pathToStyles);
(async function doSomething(source) {
  
   const files = await fsp.readdir(source);
   const writeStream = fs.createWriteStream(path.join(pathToDist, 'bundle.css'));
  
   for (const file of files) {
       let data = '';
       const pathToFile = path.join(pathToStyles, file)
       fsp.stat(pathToFile).then((stats)=>{
           if(stats.isFile && path.extname(file)==='.css'){
             const readStream = fs.createReadStream(pathToFile, 'utf-8');
             readStream.on('data', partData => data += partData);
             
             readStream.on('end', ()=> writeStream.write(data));
        }
       })
   }
})(pathToStyles)

//doSomething();
