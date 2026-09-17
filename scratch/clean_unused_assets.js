import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '..', 'src', 'assets');
const srcDir = path.join(__dirname, '..', 'src');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 1. Get all assets
const assetFiles = fs.readdirSync(assetsDir).filter(f => fs.statSync(path.join(assetsDir, f)).isFile());

// 2. Get all source code content
const srcFiles = getAllFiles(srcDir).filter(f => !f.includes(path.join('src', 'assets')));
srcFiles.push(indexHtmlPath);

let allCodeContent = '';
for (const file of srcFiles) {
  try {
    allCodeContent += fs.readFileSync(file, 'utf8') + '\n';
  } catch (e) {}
}

const unusedAssets = [];
const usedAssets = [];

for (const asset of assetFiles) {
  if (allCodeContent.includes(asset)) {
    usedAssets.push(asset);
  } else {
    unusedAssets.push(asset);
  }
}

console.log(`TOTAL ASSETS: ${assetFiles.length}`);
console.log(`USED ASSETS (${usedAssets.length}):`, usedAssets);
console.log(`UNUSED ASSETS (${unusedAssets.length}):`, unusedAssets);

// Delete unused assets
let deletedCount = 0;
let deletedBytes = 0;

for (const unused of unusedAssets) {
  const fullPath = path.join(assetsDir, unused);
  const size = fs.statSync(fullPath).size;
  fs.unlinkSync(fullPath);
  deletedCount++;
  deletedBytes += size;
}

console.log(`SUCCESSFULLY DELETED ${deletedCount} UNUSED ASSET FILES (${(deletedBytes / 1024 / 1024).toFixed(2)} MB saved)!`);
