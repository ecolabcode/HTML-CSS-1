let sharp = require('sharp');
let fs = require('fs');
let path = require('path');
let config = require('./sharp.config.js'); // Importar configuración desde sharp.config.js

let inputFolder = config.inputFolder;
let outputFolder = config.outputFolder;
let resizeOptions = config.resizeOptions;

// carpeta dist/images
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

fs.readdirSync(inputFolder).forEach(file => {
    let inputFilePath = path.join(inputFolder, file);
    let outputFilePath = path.join(outputFolder, file);

    sharp(inputFilePath)
        .resize(resizeOptions)
        .toFile(outputFilePath, (err, info) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Optimized ${file}:`, info);
            }
        });
});
