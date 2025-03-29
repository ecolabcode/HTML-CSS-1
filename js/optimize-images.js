let sharp = require('sharp');
let fs = require('fs');
let path = require('path');

// Leer configuración desde sharp.config.json
let config = JSON.parse(fs.readFileSync('sharp.config.json', 'utf8'));

let inputFolder = config.inputFolder;
let outputFolder = config.outputFolder;
let resizeOptions = config.resizeOptions;

// Crear la carpeta dist/images si no existe
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
