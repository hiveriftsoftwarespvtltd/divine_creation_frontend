const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'src', 'assets');
const svgFiles = [
  'SVg 01.svg',
  'Svg 02.svg',
  'SVg03.svg',
  'SVg 04.svg',
  'SVG 05.svg',
  'SVg 06.svg',
  'Svg 07.svg',
  'SVg 08.svg'
];

svgFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace white colors (#ffffff, #FFF, white) with gold #C89B3C
    content = content.replace(/fill="#ffffff"/gi, 'fill="#C89B3C"');
    content = content.replace(/fill="#fff"/gi, 'fill="#C89B3C"');
    content = content.replace(/stroke="#ffffff"/gi, 'stroke="#C89B3C"');
    content = content.replace(/stroke="#fff"/gi, 'stroke="#C89B3C"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} successfully.`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
