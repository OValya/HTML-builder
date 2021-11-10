const path = require('path');
const fs = require('fs/promises');
const { resolve } = require('path/win32');
const { rejects } = require('assert');
const pathDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy')
//create directory

async function copyDir(pathDir){
    await fs.rm(newDir, { recursive: true, force: true } );
    await fs.mkdir(newDir);
    const files = await fs.readdir(pathDir);
    for (const file of files) {
        await fs.copyFile(path.join(pathDir, file), path.join(newDir, file));  
    }

}

copyDir(pathDir);
