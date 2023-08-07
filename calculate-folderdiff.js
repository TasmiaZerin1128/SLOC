const fs = require('fs');
const path = require('path');
const { diffLines } = require('diff');
const colors = require('colors');

function compareFolders(folder1Path, folder2Path, totalAdd, totalRemove) {
  const filelist1 = fs.readdirSync(folder1Path);
  const filelist2 = fs.readdirSync(folder2Path);

  const filelistLength = filelist1.length;

  for (let i = 0; i < filelistLength; i++) {
    const file1Path = path.join(folder1Path, filelist1[i]);
    const stat1 = fs.statSync(file1Path);
    const file2Path = path.join(folder2Path, filelist2[i]);

    if (stat1.isDirectory()) {
      compareFolders(file1Path, file2Path, totalAdd, totalRemove);
    } else if (stat1.isFile()) {
      compareFiles(file1Path, file2Path, totalAdd, totalRemove);
    }
  }
}


function compareFiles(fileVersion1Path, fileVersion2Path, totalAdd, totalRemove) {

try {
    file1 = fs.readFileSync(fileVersion1Path, 'utf8');
    file2 = fs.readFileSync(fileVersion2Path, 'utf8');
} catch (error) {
    console.error('Error reading file:', error.message);
    return null;
}

if (file1 === null || file2 === null) {
    process.exit(1);
}

const differences = diffLines(file1, file2);

let addedLines = '', removedLines = '';
let addCount = 0, removeCount = 0;

// Print the differences
differences.forEach((part) => {
  if (part.added) {
    addedLines += part.value;
    let add = part.value.split('\n').filter(Boolean).length;
    addCount += add;
    totalAdd += add;
    } 
    else if (part.removed) {
        removedLines += part.value;
        let remove = part.value.split('\n').filter(Boolean).length;
        removeCount += remove;
        totalRemove += remove;
    }
});

if (addCount > 0 || removeCount > 0) {
  filePathArray = fileVersion1Path.split('\\');
  filePath = filePathArray.slice(1).join("\\");
  console.log("Changes in File " + filePath + "\n");
  if (addCount > 0)
    console.log(`Added-------> ${addCount} lines\n ${addedLines}` .green);
  if (removeCount > 0)
    console.log(`Removed-------> ${removeCount} lines\n ${removedLines}` .red);
}

}


const folder1Path = 'tztail-v1/src';
const folder2Path = 'tztail-v2/src';
let totalAdd = 0, totalRemove = 0;
compareFolders(folder1Path, folder2Path, totalAdd, totalRemove);
