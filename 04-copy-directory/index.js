const path = require('path');
const fs = require('fs/promises');
const { resolve } = require('path/win32');
const { rejects } = require('assert');
const pathDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy')
//create directory
fs.mkdir(newDir, {recursive:true}, (err) => {
    console.log(err)
});
//async function readDir(pathDir){
//    return fs.readdir(pathDir);
//}
async function copyDir(pathDir){
    const files = await fs.readdir(pathDir);
    for (const file of files) {
        await fs.copyFile(path.join(pathDir, file), path.join(newDir, file));  
    }
   console.log(files);
}

copyDir(pathDir);
