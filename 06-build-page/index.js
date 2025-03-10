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

 const getFilenamesInDir = (directory) => {
    return new Promise((res, err) => {
        let fileNames = [];
        fs.readdir(directory, (err, files) => { 
            for (const file of files) {
                if(path.extname(file)==='.html')
                    fileNames.push(path.parse(file).name);               
            }
            res(fileNames);
        })
    }) 
  }
 
  

 (async function() {
     await fsp.mkdir(path.join(__dirname, 'project-dist'), {recursive:true});
     let template = await getFile(path.join(__dirname, 'template.html'));//getTemplate();
     const files = await getFilenamesInDir(path.join(__dirname, 'components'));//await fs.readdir(path.join(__dirname, 'components'));
     const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
     for (const file of files) {
        
        template = template.replace(`{{${file}}}`, await getFile(path.join(__dirname, 'components', `${file}.html`)));
        
     }
    // console.log(template);
     writeStream.write(template);
          
 })();






async function setStyles(source, dist) {
   
   const files = await fsp.readdir(source);
   const writeStream = fs.createWriteStream(dist);
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
}


const pathToStyles = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist', 'style.css');
setStyles(pathToStyles, pathToDist);


async function copyDir(directoryForCopy, newDir){
   // console.log(directoryForCopy);
    const files = await fsp.readdir(directoryForCopy);
    await fsp.rm(newDir, { recursive: true, force: true } );
    await fsp.mkdir(newDir, {recursive:true});
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