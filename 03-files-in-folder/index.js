const fs = require('fs/promises');
const path = require('path');
async function readDir(directory){
  const files = await fs.readdir(directory);
  for (const file of files) {
    fs.stat(path.join(__dirname,'secret-folder', file)).then(stats => {
        if(stats.isFile()) {
          console.log(`${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${stats.size/1024}kb`)  
        };
     });      
  }
}

readDir(path.join(__dirname, 'secret-folder'));

