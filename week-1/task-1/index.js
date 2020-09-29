const fs = require('fs');

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
        try {
            return fs.readFileSync(`${path}${file}`, 'utf-8');
        } catch (error) {
            console.log(error)
        }
    });
    return content
}

const init = async (path) => {
    if (fs.existsSync(path)) {
        let mdFiles = await searchFiles(path);
        let filesContent = readFiles(path, mdFiles);
        console.log(filesContent);
    } else {
        console.error("The provided path doesn't exit");
    }

}

init('./documents/');


