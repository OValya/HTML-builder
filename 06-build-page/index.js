/*
const { readdir } = require('fs/promises');
//const  = require('fs/promises');
//const { stdin } = require('node:process');
const path = require('path');*/
//read template to data
const { createReadStream } = require('fs');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');

const getFile/*getTemplate*/ = (pathToFile) => {
    return new Promise((res, err) => {
        let data = '';
        const readStream = createReadStream(pathToFile/*path.join(__dirname, 'template.html')*/);
        readStream.on('data', chunk => {data += chunk; res(data)});
    });
 }

 /*const readFileWithTag = (pathToFile) => {
    return new Promise((res, err) => {
        let data = '';
        const readStream = createReadStream(pathToFile);
        readStream.on('data', chunk => {
            if(chunk.includes('{{')){

            data += chunk; res(data)});
    });
 }*/

 const getFilenamesInDir = (directory) => {
    return new Promise((res, err) => {
        let fileNames = [];
        fs.readdir(directory, (err, files) => { 
            for (const file of files) {
                fileNames.push(path.parse(file).name);               
            }
            res(fileNames);
        })
    }) 
  }
 
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, (err) => {
    console.log(err)
});

 (async function() {
     let template = await getFile(path.join(__dirname, 'template.html'));//getTemplate();
     const files = await getFilenamesInDir(path.join(__dirname, 'components'));//await fs.readdir(path.join(__dirname, 'components'));
     const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
     for (const file of files) {
        //let insert =  await getFile(path.join(__dirname, 'components', `${file}.html`));
        template = template.replace(`{{${file}}}`, await getFile(path.join(__dirname, 'components', `${file}.html`)));
        //console.log(insert);
     }
     console.log(template);
     writeStream.write(template);
          
 })();





//console.log(pathToStyles);
async function setStyles(source, dist) {
   const files = await fsp.readdir(source);
   const writeStream = fs.createWriteStream(dist);
  /// console.log(files);
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


const pathToStyles = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist', 'bundle.css');
setStyles(pathToStyles, pathToDist);


async function copyDir(directoryForCopy, newDir){
    console.log(directoryForCopy);
    const files = await fsp.readdir(directoryForCopy);
    fs.mkdir(newDir, {recursive:true}, (err) => {
        console.log(err)
    });
    for (const file of files) {
      const pathToFile = path.join(directoryForCopy, file);
      fsp.stat(pathToFile).then((stats)=>{
           if(stats.isDirectory()){ 
               copyDir(pathToFile, path.join(newDir, file));
           } else fsp.copyFile(path.join(directoryForCopy, file), path.join(newDir, file));  
      })
    }
}

const distDir = path.join(__dirname, 'project-dist', 'assets' )
copyDir(path.join(__dirname, 'assets'), distDir);