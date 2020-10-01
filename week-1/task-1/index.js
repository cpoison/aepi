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

const readFiles = async (path, mdFiles) => {
    let content = mdFiles.map(file => {

        return new Promise((resolve, reject) => {
            fs.readFile(`${path}${file}`, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        })


        // try {
        //     return fs.readFileSync(`${path}${file}`, 'utf-8');
        // } catch (error) {
        //     console.error(error)
        // }
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


