const fs = require('fs');

const readSettings = () => {
    return new Promise(resolve => {
        //Async Callback
        fs.readFile('settings.json', 'utf-8', (err, data) => {
            if (!err) {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({});
                }                
            } else {
                resolve({});
            }
        });
    });   

    //Synchrone Variante
    try {
        return JSON.parse(fs.readFileSync('settings.json'));
    } catch (e) {
        return {};
    }
}

const writeSettings = data => {
    //Sync um sicher zu gehen, dass Datei geschrieben wird, wenn receiveSettings abgearbeitet ist
    fs.writeFileSync('settings.json', JSON.stringify(data)); //2. Erstellt eine settings.json mit req.body
}

module.exports = {
    readSettings,
    writeSettings
}