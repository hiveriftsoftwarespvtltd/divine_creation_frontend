const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');
const svgFiles = [
  '01.svg',
  '02.svg',
  '03.svg',
  '04.svg',
  '05.svg',
  '06.svg',
  '07.svg',
  '08.svg'
];

svgFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace sandy gold #deb686 or other fills/strokes with brand gold #C89B3C
    content = content.replace(/fill="#deb686"/gi, 'fill="#C89B3C"');
    content = content.replace(/fill="#deb686"/gi, 'fill="#C89B3C"');
    content = content.replace(/stroke="#deb686"/gi, 'stroke="#C89B3C"');
    content = content.replace(/fill="#deb585"/gi, 'fill="#C89B3C"'); // safe fallback
    content = content.replace(/stroke="#deb585"/gi, 'stroke="#C89B3C"'); // safe fallback
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Recolored new ${file} to brand gold.`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
