const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = './assets/images';
const maxWidth = 1600;
const quality = 75;

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const tempPath = fullPath + '.tmp.png';
      sharp(fullPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .png({ quality })
        .toFile(tempPath)
        .then(() => {
          const finalPath = fullPath.replace(/\.(png|jpeg|jpg)$/i, '.png');
          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, finalPath);
          console.log('Compressed:', finalPath);
        })
        .catch(err => console.error('Failed:', fullPath, err.message));
    }
  });
}

walk(targetDir);