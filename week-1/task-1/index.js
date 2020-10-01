const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const searchFiles = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files.filter(file => file.match(/\.md/)))
            }
        });
    })
}

const readFiles = (path, mdFiles) => {
    let content = mdFiles.map(file => {   
        readFile(`${path}${file}`, 'utf-8',)
            .then(data => data)
            .catch(err => console.error(err));
    
    });
    return content
}

const init = async (path) => {
    if (fs.existsSync(path)) {
        let mdFiles = await searchFiles(path);
        let filesContent = await readFiles(path, mdFiles);
        console.log(filesContent);
    } else {
        console.error("The provided path doesn't exit");
    }

}

init('./documents/');


